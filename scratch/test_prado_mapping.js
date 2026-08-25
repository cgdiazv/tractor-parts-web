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

async function testMapping() {
  const res = await fetch(`${baseUrl}/api/products?storeId=${storeId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Accept': 'application/json' }
  });
  const rawProducts = await res.json();
  console.log(`Fetched ${rawProducts.length} raw products from Prado Store ID: ${storeId}`);
  
  const mapped = rawProducts.map((item, idx) => ({
    name: item.title,
    brand: item.manufacturer || 'Caterpillar',
    sku: item.variants?.[0]?.sku || item.slug,
    category: item.categoryName || 'General Engine & Drive Parts',
    image: item.images?.[0]
  }));

  console.log('\nSample Mapped Product 1:', mapped[0]);
  console.log('Sample Mapped Product 2:', mapped[1]);
  console.log('Sample Mapped Product 3:', mapped[2]);
}

testMapping();
