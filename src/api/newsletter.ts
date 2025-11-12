import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from './db';
import { initializeDatabase } from './init';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await initializeDatabase();
    const collection = await getCollection('newsletter');

    switch (req.method) {
      case 'GET':
        const subscriptions = await collection.find({}).toArray();
        return res.status(200).json(subscriptions.map(s => ({ ...s, id: s._id })));

      case 'POST':
        const { email } = req.body;
        
        // Check if email already exists
        const existing = await collection.findOne({ email });
        if (existing) {
          return res.status(400).json({ error: 'Email already subscribed' });
        }

        const newSubscription = {
          _id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          email,
          subscribedAt: new Date().toISOString(),
        };
        await collection.insertOne(newSubscription);
        return res.status(201).json({ ...newSubscription, id: newSubscription._id });

      case 'DELETE':
        const deleteId = req.query.id as string;
        await collection.deleteOne({ _id: deleteId });
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
