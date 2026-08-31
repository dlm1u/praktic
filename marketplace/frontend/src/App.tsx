import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
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

function AppContent() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
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

  const clearCart = () => setCart([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <Header cartCount={cartCount} />

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
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
