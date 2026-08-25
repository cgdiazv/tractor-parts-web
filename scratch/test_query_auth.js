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

const queryTests = [
  `/api/stores?apiKey=${apiKey}&secret=${secret}`,
  `/api/stores?key=${apiKey}&secret=${secret}`,
  `/api/stores?api_key=${apiKey}&api_secret=${secret}`,
  `/api/stores?token=${apiKey}`,
  `/api/products?apiKey=${apiKey}&secret=${secret}`,
  `/api/products?key=${apiKey}&secret=${secret}`,
];

async function runQueryTests() {
  for (const path of queryTests) {
    const url = `${baseUrl}${path}`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.status} | Response: ${text.substring(0, 300)}\n---`);
    } catch (e) {
      console.error(`Error ${url}:`, e.message);
    }
  }
}

runQueryTests();
