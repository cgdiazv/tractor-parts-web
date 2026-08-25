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

async function inspectProducts() {
  try {
    const res = await fetch(`${baseUrl}/api/products?storeId=${storeId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'x-api-key': apiKey || '',
        'Accept': 'application/json'
      }
    });
    const products = await res.json();
    console.log('Total Prado Products:', products.length);
    if (products.length > 0) {
      console.log('Sample Product 1:', JSON.stringify(products[0], null, 2));
      if (products.length > 1) {
        console.log('Sample Product 2:', JSON.stringify(products[1], null, 2));
      }
    }
  } catch (e) {
    console.error('Error fetching products:', e.message);
  }
}

inspectProducts();
