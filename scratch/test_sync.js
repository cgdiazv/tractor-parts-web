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
const storeId = process.env.PRADO_STORE_ID || '';
const pradoUrl = process.env.PRADO_API_URL || 'https://api.getprado.com';

console.log('=== Prado API Sync Verification ===');
console.log('API URL:', pradoUrl);
console.log('API Key:', apiKey);
console.log('API Secret:', secret ? '[SET]' : '[NOT SET]');
console.log('Store ID:', storeId || '[NOT SET]');

async function checkSync() {
  const endpoints = [
    `https://api.getprado.com/api/v3/external/products${storeId ? `?storeId=${storeId}` : ''}`,
    `https://prado-commerce-1blpq5eaa-cgdiazvs-projects.vercel.app/api/products${storeId ? `?storeId=${storeId}` : ''}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'x-api-key': apiKey || '',
          'Accept': 'application/json'
        }
      });
      const text = await res.text();
      console.log(`\nURL: ${url}`);
      console.log(`Status: ${res.status} ${res.statusText}`);
      console.log(`Response Snippet: ${text.substring(0, 400)}`);
    } catch (e) {
      console.error(`URL ${url} Error:`, e.message);
    }
  }
}

checkSync();
