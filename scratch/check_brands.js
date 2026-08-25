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

const storeId = process.env.PRADO_STORE_ID;
const apiKey = process.env.PRADO_API_KEY;
const baseUrl = process.env.PRADO_API_URL || 'https://prado-commerce-1blpq5eaa-cgdiazvs-projects.vercel.app';

async function checkBrands() {
  const res = await fetch(`${baseUrl}/api/products?storeId=${storeId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Accept': 'application/json' }
  });
  const products = await res.json();
  const brands = {};
  products.forEach(p => {
    const b = p.manufacturer || p.brand || 'Unknown';
    brands[b] = (brands[b] || 0) + 1;
  });
  console.log('Brand breakdown in Prado Data:', brands);
}

checkBrands();
