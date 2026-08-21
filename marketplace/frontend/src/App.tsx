import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout.tsx';
import './App.css';

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price_rub: number;
  price_usd: number;
  image_url: string;
  quantity: number;
}

function Header({ cartCount, user }: { cartCount: number, user: any }) {
  const location = useLocation();

  const getLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      color: path === '/' ? 'var(--accent-blue)' : 'var(--text-main)', 
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: path === '/' ? 600 : 400,
      padding: '4px 8px',
      borderRadius: '4px',
      border: isActive ? '1px solid var(--text-main)' : '1px solid transparent',
      transition: 'border 0.2s ease-in-out'
    };
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '20px 40px', 
      backgroundColor: 'var(--header-bg)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Link to="/" style={getLinkStyle('/')}>Главная</Link>
        <Link to="/catalog" style={getLinkStyle('/catalog')}>Каталог</Link>
        <Link to="/cart" style={getLinkStyle('/cart')}>Корзина ({cartCount})</Link>
      </nav>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {user?.role === 'admin' && (
          <Link to="/admin" style={{ color: 'var(--accent-green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: 500 }}>
            <span>🛠</span> Админка
          </Link>
        )}
        
        <Link to="/profile" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px' }}>
          <span>👤</span> {user ? user.email : 'Войти'}
        </Link>
      </div>
    </header>
  );
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<{ email: string; role: string } | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
        <Header cartCount={cartCount} user={user} />

        <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<div style={{ textAlign: 'center', marginTop: '50px' }}><h1>Добро пожаловать в сервис выкупа</h1><Link to="/catalog" style={{ color: 'var(--accent-blue)' }}>Перейти в каталог</Link></div>} />
            <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} clearCart={() => setCart([])} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={() => setCart([])} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}