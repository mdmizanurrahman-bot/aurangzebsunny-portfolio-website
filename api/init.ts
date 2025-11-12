// `src/api/init.ts` exports helpers (initializeDatabase) but not a default
// Vercel request handler. Expose a simple admin-only seed endpoint here
// if you want to trigger initialization manually. For security do not
// enable this in production without authentication.

import { initializeDatabase } from '../src/api/init';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	try {
		// Optional: protect with a one-time token via env
		const token = process.env.SEED_TOKEN;
		if (token && req.headers['x-seed-token'] !== token) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		await initializeDatabase();
		return res.status(200).json({ success: true, message: 'Database initialized' });
	} catch (err) {
		console.error('Seed error', err);
		return res.status(500).json({ error: 'Seed failed' });
	}
}
