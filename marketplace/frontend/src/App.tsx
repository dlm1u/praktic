import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './pages/AdminPanel';
import Checkout from './pages/Checkout';
import './App.css';

const lilacLogo = (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M20 3C20 3 14.5 10.5 14.5 17.5C14.5 22.5 17 25.5 20 28C23 25.5 25.5 22.5 25.5 17.5C25.5 10.5 20 3 20 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28V38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 33C17 31 14 32 13 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 36C23 34 26 35 27 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price_rub: number;
  price_usd: number;
  image_url: string;
  quantity: number;
}

function Header({ cartCount, user }: { cartCount: number; user: { email: string; role: string } | null }) {
  const location = useLocation();

  const getLinkStyle = (path: string): React.CSSProperties => {
    const isActive = location.pathname === path;
    return {
      color: isActive ? 'var(--bg-color)' : 'var(--text-muted)',
      textDecoration: 'none',
      fontSize: '14px',
      fontFamily: 'var(--sans)',
      fontWeight: isActive ? 500 : 400,
      padding: '8px 14px',
      borderRadius: '100px',
      letterSpacing: '0.02em',
      transition: 'all 0.3s ease',
      backgroundColor: isActive ? 'var(--text-main)' : 'transparent',
    };
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 48px',
      backgroundColor: 'var(--header-bg)',
      borderBottom: '1px solid var(--border-light)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backdropFilter: 'blur(12px)'
    }}>
      <nav style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: 'var(--text-main)',
          marginRight: '24px'
        }}>
          {lilacLogo}
          <span style={{
            fontSize: '18px',
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            letterSpacing: '0.02em'
          }}>
            Concierge
          </span>
        </Link>

        <Link to="/catalog" style={getLinkStyle('/catalog')}>
          Доступно к заказу
        </Link>
        <Link to="/cart" style={getLinkStyle('/cart')}>
          Заявка ({cartCount})
        </Link>
      </nav>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {user?.role === 'admin' && (
          <Link to="/admin" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontFamily: 'var(--sans)',
            fontWeight: 400,
            padding: '8px 14px',
            borderRadius: '100px',
            transition: 'all 0.3s ease'
          }}>
            Настройки
          </Link>
        )}

        <Link to="/profile" style={{
          color: 'var(--text-muted)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          fontFamily: 'var(--sans)',
          fontWeight: 400,
          padding: '8px 16px',
          borderRadius: '100px',
          border: '1px solid var(--border-color)',
          transition: 'all 0.3s ease'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 20C6 17 8.5 15 12 15C15.5 15 18 17 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {user ? user.email : 'Войти'}
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

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px 80px' }}>
          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', opacity: 0.6 }}>
                  <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2C20 2 13 11 13 19C13 25 16 28.5 20 31C24 28.5 27 25 27 19C27 11 20 2 20 2Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 31V40" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M20 36C16 33 12 34 11 37" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M20 39C24 36 28 37 29 40" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M8 15C8 15 4 12 3 15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M32 15C32 15 36 12 37 15" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h1 style={{
                  fontSize: 'clamp(36px, 6vw, 64px)',
                  fontWeight: 300,
                  fontFamily: 'var(--serif)',
                  color: 'var(--text-main)',
                  margin: '0 0 20px 0',
                  lineHeight: 1.15
                }}>
                  Персональный<br/>консьерж-сервис
                </h1>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '17px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  maxWidth: '520px',
                  marginInline: 'auto',
                  lineHeight: 1.8,
                  marginBottom: '48px'
                }}>
                  Индивидуальный выкуп оригинальных брендовых сумок<br/>
                  из официальных бутиков по всему миру
                </p>
                <Link to="/catalog">
                  <button style={{
                    backgroundColor: 'var(--text-main)',
                    color: 'var(--bg-color)',
                    border: 'none',
                    padding: '18px 40px',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer'
                  }}>
                    Смотреть каталог
                  </button>
                </Link>
              </div>
            } />
            <Route path="/catalog" element={<Catalog addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} clearCart={() => setCart([])} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={() => setCart([])} />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        <footer style={{
          borderTop: '1px solid var(--border-light)',
          padding: '32px 48px',
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <p style={{
            fontSize: '12px',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            color: 'var(--text-light)',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            © 2025 Concierge — Персональный сервис выкупа
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}
