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
const apiUrl = process.env.PRADO_API_URL || 'https://api.getprado.com/v1';

console.log('Testing Prado API Connection...');
console.log('API URL:', apiUrl);
console.log('API Key configured:', apiKey ? `YES (Length: ${apiKey.length})` : 'NO');

if (!apiKey) {
  console.log('No PRADO_API_KEY found in .env.local');
  process.exit(1);
}

fetch(`${apiUrl}/products`, {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
  }
})
.then(async (res) => {
  console.log('HTTP Status Code:', res.status, res.statusText);
  const text = await res.text();
  console.log('Response Content:', text);
})
.catch(err => {
  console.error('Fetch Exception:', err.message);
});
