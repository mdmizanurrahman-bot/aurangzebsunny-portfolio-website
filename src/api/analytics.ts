import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCollection } from './db';
import { initializeDatabase } from './init';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await initializeDatabase();

    const projects = await (await getCollection('projects')).countDocuments();
    const posts = await (await getCollection('posts')).countDocuments();
    const videos = await (await getCollection('videos')).countDocuments();
    const certificates = await (await getCollection('certificates')).countDocuments();
    const jobs = await (await getCollection('jobs')).countDocuments();
    const reviews = await (await getCollection('reviews')).countDocuments();
    const messages = await (await getCollection('messages')).countDocuments();
    const unreadMessages = await (await getCollection('messages')).countDocuments({ read: false });

    return res.status(200).json({
      totalProjects: projects,
      totalPosts: posts,
      totalVideos: videos,
      totalCertificates: certificates,
      totalJobs: jobs,
      totalReviews: reviews,
      totalMessages: messages,
      unreadMessages,
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
