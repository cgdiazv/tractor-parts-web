const fs = require('fs');

if (fs.existsSync('.env.local')) {
  const content = fs.readFileSync('.env.local', 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.substring(0, idx).trim();
      let val = trimmed.substring(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  });
}

const apiKey = process.env.PRADO_API_KEY;

const candidateEndpoints = [
  'https://api.getprado.com/api/v3/external/products',
  'https://api.getprado.com/api/v3/Products',
  'https://api.getprado.com/api/v2/Products/gather',
  'https://api.getprado.com/api/v2/Products/get',
  'https://api.getprado.com/api/v1000/MobileApp/Product/listWithFilters',
];

async function testRealEndpoints() {
  console.log('Testing Prado Real Endpoints with API Key:', apiKey ? 'Present' : 'Missing');

  for (const url of candidateEndpoints) {
    try {
      const res = await fetch(url, {
        method: url.endsWith('/gather') || url.endsWith('/listWithFilters') ? 'POST' : 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: url.endsWith('/gather') || url.endsWith('/listWithFilters') ? JSON.stringify({}) : undefined
      });
      const contentType = res.headers.get('content-type') || '';
      console.log(`URL: ${url} [${res.status} ${res.statusText}]`);
      const text = await res.text();
      console.log(`Response Snippet: ${text.substring(0, 400)}\n---`);
    } catch (err) {
      console.log(`URL: ${url} | Error: ${err.message}\n---`);
    }
  }
}

testRealEndpoints();
