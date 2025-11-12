// Simple health-check endpoint to verify Vercel /api routing
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') return res.status(200).end();
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
};
