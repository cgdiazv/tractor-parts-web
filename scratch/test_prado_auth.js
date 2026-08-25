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

const targetUrl = 'https://api.getprado.com/api/v3/external/products';

const authHeaderOptions = [
  { name: 'Bearer Token', headers: { 'Authorization': `Bearer ${apiKey}` } },
  { name: 'Raw Token', headers: { 'Authorization': `${apiKey}` } },
  { name: 'X-API-Key', headers: { 'X-API-Key': `${apiKey}` } },
  { name: 'api-key', headers: { 'api-key': `${apiKey}` } },
  { name: 'X-Prado-API-Key', headers: { 'X-Prado-API-Key': `${apiKey}` } },
  { name: 'Query Param', url: `${targetUrl}?api_key=${apiKey}`, headers: {} },
  { name: 'Query Token', url: `${targetUrl}?token=${apiKey}`, headers: {} },
];

async function testAuthHeaders() {
  console.log('Testing Auth Headers on Endpoint:', targetUrl);

  for (const opt of authHeaderOptions) {
    const url = opt.url || targetUrl;
    try {
      const res = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...opt.headers
        }
      });
      const text = await res.text();
      console.log(`Option: ${opt.name} | Status: ${res.status} ${res.statusText} | Response: ${text.substring(0, 300)}`);
    } catch (err) {
      console.log(`Option: ${opt.name} | Error: ${err.message}`);
    }
  }
}

testAuthHeaders();
