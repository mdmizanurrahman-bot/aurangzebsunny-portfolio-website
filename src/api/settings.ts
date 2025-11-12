import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from './db';
import { initializeDatabase } from './init';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await initializeDatabase();
    const collection = await getCollection('settings');

    switch (req.method) {
      case 'GET':
        const settings = await collection.findOne({ _id: 'main-settings' });
        return res.status(200).json(settings || {});

      case 'PUT':
        const updates = req.body;
        await collection.updateOne(
          { _id: 'main-settings' },
          { $set: { ...updates, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
