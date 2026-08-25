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
const baseUrl = process.env.PRADO_API_URL || 'https://api.getprado.com';

async function testFullAuth() {
  console.log('=== Prado API Full Connection Test ===');
  console.log('PRADO_API_KEY:', apiKey ? `Present (Length ${apiKey.length})` : 'Missing');
  console.log('PRADO_API_SECRET:', secret ? `Present (Length ${secret.length})` : 'Missing');

  let token = apiKey;

  if (secret) {
    console.log('\n[Step 1] Requesting JWT Token via obtainToken endpoint...');
    try {
      const res = await fetch(`${baseUrl}/api/v3/external/authenticate/obtainToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ apiKey, secret })
      });
      console.log(`obtainToken Status: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log(`obtainToken Response: ${text}`);
      try {
        const json = JSON.parse(text);
        token = json.token || json.accessToken || json.access_token || token;
        console.log('Token acquired:', token ? token.substring(0, 20) + '...' : 'None');
      } catch (e) {}
    } catch (e) {
      console.error('obtainToken Exception:', e.message);
    }
  }

  console.log('\n[Step 2] Testing /api/v3/external/products with token...');
  const endpointsToTest = [
    `${baseUrl}/api/v3/external/products`,
    `${baseUrl}/api/v3/Products`,
    `${baseUrl}/api/v2/Products/get`
  ];

  for (const url of endpointsToTest) {
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();
      console.log(`URL: ${url} | Status: ${res.status} ${res.statusText} | Content-Type: ${contentType}`);
      console.log(`Body Snippet: ${text.substring(0, 300)}\n`);
    } catch (e) {
      console.error(`URL ${url} Exception:`, e.message);
    }
  }
}

testFullAuth();
