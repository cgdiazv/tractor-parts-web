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
const baseUrl = 'https://prado-commerce-1blpq5eaa-cgdiazvs-projects.vercel.app';

const headerCombos = [
  { 'x-api-key': apiKey },
  { 'x-api-key': apiKey, 'x-api-secret': secret },
  { 'Authorization': `Bearer ${apiKey}` },
  { 'Authorization': `Bearer ${secret}` },
  { 'x-public-key': apiKey, 'x-secret-key': secret },
  { 'x-prado-key': apiKey, 'x-prado-secret': secret },
];

async function testStoreAuth() {
  console.log('Testing Header Combos for Stores Endpoint...');

  for (let i = 0; i < headerCombos.length; i++) {
    const headers = headerCombos[i];
    try {
      const res = await fetch(`${baseUrl}/api/stores`, { headers });
      const text = await res.text();
      console.log(`Combo ${i + 1}: Status ${res.status} | Response: ${text}`);
      if (res.ok) {
        console.log(`SUCCESS! Stores Data:`, text);
      }
    } catch (e) {
      console.error(`Combo ${i + 1} Exception:`, e.message);
    }
  }
}

testStoreAuth();
