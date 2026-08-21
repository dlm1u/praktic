import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sign, verify } from 'hono/jwt'
import Database from 'better-sqlite3'
import crypto from 'crypto'

const app = new Hono()
const db = new Database('marketplace.db')
const JWT_SECRET = 'super-secret-key-12345';

app.use('/api/*', cors())

// Инициализация базы данных
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'user'
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price_usd REAL NOT NULL,
    price_rub REAL NOT NULL,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    total_price REAL NOT NULL,
    status TEXT DEFAULT 'pending_buyout',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// === СОЗДАНИЕ АДМИНА С ВЫВОДОМ В ТЕРМИНАЛ ===
try {
  const adminEmail = 'admin@mail.ru';
  const adminExists = db.prepare('SELECT * FROM users WHERE email = ?').get(adminEmail);
  
  if (!adminExists) {
    db.prepare("INSERT INTO users (email, password_hash, role) VALUES (?, ?, 'admin')")
      .run(adminEmail, hashPassword('admin123'));
    console.log('✅ Супер-пользователь (Админ) успешно создан!');
  } else {
    console.log('ℹ️ Аккаунт админа уже существует в базе.');
  }
} catch (e) {
  console.error('❌ Ошибка при создании админа:', e);
}

async function checkAdmin(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    const payload = await verify(token, JWT_SECRET, 'HS256');
    return payload.role === 'admin' ? payload : null;
  } catch (e) { return null; }
}

// Проверка авторизации обычного пользователя
async function checkUser(c: any) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  try {
    const token = authHeader.split(' ')[1];
    return await verify(token, JWT_SECRET, 'HS256');
  } catch (e) { return null; }
}

// === AUTH ===
app.post('/api/auth/register', async (c) => {
  try {
    const body = await c.req.json();
    const email = body.email.trim(); // Убираем случайные пробелы
    const password = body.password;

    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existing) return c.json({ success: false, error: 'Пользователь уже существует' }, 400);

    const res = db.prepare('INSERT INTO users (email, password_hash, role) VALUES (?, ?, "user")').run(email, hashPassword(password));
    const token = await sign({ id: res.lastInsertRowid, email, role: 'user' }, JWT_SECRET);
    
    return c.json({ success: true, token, user: { email, role: 'user' } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

app.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const email = body.email.trim(); // Защита от пробелов при вводе
    const password = body.password;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (!user || user.password_hash !== hashPassword(password)) {
      return c.json({ success: false, error: 'Неверный логин или пароль' }, 400);
    }
    const token = await sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET);
    return c.json({ success: true, token, user: { email: user.email, role: user.role } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// === КАТАЛОГ И ТОВАРЫ ===
app.get('/api/products', (c) => {
  const products = db.prepare('SELECT * FROM products').all();
  return c.json(products);
});

app.get('/api/products/:id', async (c) => {
  const id = c.req.param('id');
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as any;
  
  if (!product) return c.json({ error: 'Товар не найден' }, 404);

  const parsedData = {
    parsedFrom: 'Официальный бутик (Европа)',
    availability: 'Доступно для выкупа',
    deliveryEst: '14-21 день'
  };
  return c.json({ ...product, parsedData });
});

// === АДМИНКА ===
app.post('/api/products', async (c) => {
  if (!await checkAdmin(c)) return c.json({ error: 'Запрещено' }, 403);
  
  const { name, description, price_usd, price_rub, image_url } = await c.req.json();
  
  const res = db.prepare('INSERT INTO products (name, description, price_usd, price_rub, image_url) VALUES (?, ?, ?, ?, ?)').run(name, description, price_usd, price_rub, image_url);
  
  return c.json({ success: true, id: res.lastInsertRowid });
});

app.delete('/api/products/:id', async (c) => {
  if (!await checkAdmin(c)) return c.json({ error: 'Запрещено' }, 403);
  db.prepare('DELETE FROM products WHERE id = ?').run(c.req.param('id'));
  return c.json({ success: true });
});

// === ЗАКАЗЫ ===
app.post('/api/orders', async (c) => {
  const user: any = await checkUser(c);
  if (!user) return c.json({ error: 'Не авторизован' }, 401);

  const { items, totalPrice } = await c.req.json();
  
  const res = db.prepare('INSERT INTO orders (user_id, total_price) VALUES (?, ?)').run(user.id, totalPrice);
  
  return c.json({ success: true, orderId: res.lastInsertRowid });
});

// === ЗАПУСК СЕРВЕРА ===
serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`🚀 Бэкенд работает на порту ${info.port}`)
});