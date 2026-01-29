import 'dotenv/config';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN!;


if (!STRAPI_URL || !STRAPI_TOKEN) {
  throw new Error('Missing STRAPI_URL or STRAPI_TOKEN');
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

async function createCategory(name: string, slug: string) {
  const res = await fetch(`${STRAPI_URL}/api/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: { name, slug },
    }),
  });

  const json = await res.json();
  return json.data;
}

async function createProduct(product: any) {
  const res = await fetch(`${STRAPI_URL}/api/products`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: product,
    }),
  });

  return res.json();
}

async function main() {
  console.log('🌱 Seeding Strapi database...');

  // 1. Categories
  const categories = [
    { name: 'Running', slug: 'running' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Training', slug: 'training' },
  ];

  const categoryMap: Record<string, number> = {};

  for (const cat of categories) {
    const created = await createCategory(cat.name, cat.slug);
    categoryMap[cat.slug] = created.id;
  }

  // 2. Products
  const products = [
    {
      name: 'Velocity Runner',
      price: 120,
      image: '/velocity.png',
      description: 'Lightweight, fast, comfortable.',
      category: categoryMap.running,
    },
    {
      name: 'Street Flex',
      price: 95,
      image: '/streetflex.png',
      description: 'Casual comfort for everyday wear.',
      category: categoryMap.lifestyle,
    },
  ];

  for (const p of products) {
    await createProduct({
      name: p.name,
      price: p.price,
      image: p.image,
      description: p.description,
      category: p.category,
    });
  }

  console.log('✅ Strapi seed complete');
}

main().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});


