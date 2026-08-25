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
const secret = process.env.PRADO_API_SECRET;
const baseUrl = process.env.PRADO_API_URL || 'https://prado-commerce-1blpq5eaa-cgdiazvs-projects.vercel.app';

console.log('Testing Prado Store URL:', baseUrl);
console.log('API Key:', apiKey);
console.log('Secret:', secret);

const routesToTest = [
  '/api/products',
  '/api/inventory',
  '/api/catalog',
  '/api/v1/products',
  '/api/v2/products',
  '/api/v3/products',
  '/api/store',
  '/api/items',
  '/products.json',
  '/inventory.json',
];

async function testVercelStore() {
  for (const path of routesToTest) {
    const url = `${baseUrl}${path}`;
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-API-Key': apiKey || '',
          'X-API-Secret': secret || '',
          'Accept': 'application/json'
        }
      });
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();
      console.log(`URL: ${url} | Status: ${res.status} | Content-Type: ${contentType}`);
      if (res.ok) {
        console.log(`>>> SUCCESS! Snippet: ${text.substring(0, 300)}\n`);
      } else {
        console.log(`Snippet: ${text.substring(0, 150)}\n`);
      }
    } catch (e) {
      console.error(`URL: ${url} | Error: ${e.message}`);
    }
  }
}

testVercelStore();
