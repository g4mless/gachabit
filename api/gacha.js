// /api/gacha.js
// Vercel Serverless Function untuk proxy Safebooru API

export default async function handler(req, res) {
  const apiUrl = 'https://safebooru.org/api/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=1girl%20sort:random';
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch from Safebooru' });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
