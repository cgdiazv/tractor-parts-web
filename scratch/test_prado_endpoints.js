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

const testUrls = [
  'https://api.getprado.com/v1/products',
  'https://api.getprado.com/v1/customers',
  'https://api.getprado.com/v1/orders',
  'https://api.getprado.com/v1/subscriptions',
  'https://api.getprado.com/v1/me',
  'https://api.getprado.com/v1/store',
  'https://api.getprado.com/',
];

async function runTests() {
  console.log('Testing Prado API Endpoints with API Key:', apiKey ? 'Present (Length ' + apiKey.length + ')' : 'Missing');

  for (const url of testUrls) {
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.status} ${res.statusText} | Content-Type: ${contentType}`);
      console.log(`Body Snippet: ${text.substring(0, 250)}\n---`);
    } catch (err) {
      console.log(`URL: ${url} | Error: ${err.message}\n---`);
    }
  }
}

runTests();
