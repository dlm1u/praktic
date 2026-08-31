import Database from 'better-sqlite3';

const db = new Database('marketplace.db');

// Обновляем бренды для существующих товаров
const updates = [
  { brand: 'Gucci', pattern: '%Gucci%' },
  { brand: 'Moschino', pattern: '%Moschino%' },
  { brand: 'Prada', pattern: '%Prada%' },
  { brand: 'Louis Vuitton', pattern: '%Speedy%' },
  { brand: 'Hermès', pattern: '%Kelly%' },
  { brand: 'Chanel', pattern: '%Hobo%' },
  { brand: 'Gucci', pattern: '%Book Tote%' },
];

for (const { brand, pattern } of updates) {
  db.prepare(`UPDATE products SET brand = ? WHERE name LIKE ?`).run(brand, pattern);
}

const products = db.prepare('SELECT id, name, brand FROM products').all();
console.log('Обновленные товары:');
products.forEach(p => console.log(`  ID:${p.id} | Brand: ${p.brand || '(null)'} | Name: ${p.name}`));

db.close();
console.log('\n✅ Бренды обновлены!');
