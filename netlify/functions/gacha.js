// /netlify/functions/gacha.js
// Netlify Function untuk proxy Safebooru API

exports.handler = async (event, context) => {
  // Set CORS headers untuk Netlify Functions
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const apiUrl = 'https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&limit=1&tags=1girl%20sort:random';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; GachaBit/1.0; +https://netlify.com)'
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch from Safebooru', status: response.status, body: text })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};