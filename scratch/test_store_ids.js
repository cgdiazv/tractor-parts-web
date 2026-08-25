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
const baseUrl = 'https://prado-commerce-1blpq5eaa-cgdiazvs-projects.vercel.app';

const storeIdCandidates = [
  '1', '0', 'default', 'main', 'store', 'all', 'prado', 'tractor-parts', 'orlando', 'store-1', 'store_1'
];

async function testStoreIds() {
  console.log('Testing storeId Candidates on:', baseUrl + '/api/products');

  for (const storeId of storeIdCandidates) {
    const url = `${baseUrl}/api/products?storeId=${storeId}`;
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'x-api-key': apiKey || '',
          'Accept': 'application/json'
        }
      });
      const text = await res.text();
      console.log(`storeId="${storeId}" | Status: ${res.status} | Snippet: ${text.substring(0, 300)}`);
      if (res.ok) {
        console.log(`\n🎉 SUCCESS FOR storeId="${storeId}"!\nFull Response:\n${text}\n`);
      }
    } catch (e) {
      console.error(`storeId="${storeId}" Error:`, e.message);
    }
  }
}

testStoreIds();
