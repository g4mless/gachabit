// /api/gacha.js
// Vercel Serverless Function untuk proxy Safebooru API

export default async function handler(req, res) {
  const apiUrl = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=1girl%20sort:random';
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GachaBit/1.0; +https://vercel.com)'
      }
    });
    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: 'Failed to fetch from Safebooru', status: response.status, body: text });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
