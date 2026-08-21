import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../App';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
}

export default function Cart({ cart, updateQuantity }: CartProps) {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + item.price_rub * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-main)' }}>Корзина пуста 🛒</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Перейдите в каталог, чтобы добавить товары.</p>
        <Link to="/catalog">
          <button style={{
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-color)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Перейти в каталог
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '32px', textAlign: 'center', color: 'var(--text-main)' }}>
        Корзина выкупа
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {cart.map((item) => (
          <div key={item.id} style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', padding: '4px' }}>
                <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: 'var(--text-main)' }}>{item.name}</h4>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{item.price_rub.toLocaleString()} ₽ за шт.</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--bg-color)', padding: '4px 12px', borderRadius: '8px' }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>-</button>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)' }}>+</button>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 700, minWidth: '90px', textAlign: 'right', color: 'var(--text-main)' }}>
                {(item.price_rub * item.quantity).toLocaleString()} ₽
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Итого к оплате:</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>{totalPrice.toLocaleString()} ₽</div>
        </div>

        <button 
          onClick={() => navigate('/checkout')}
          style={{
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-color)',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Перейти к оформлению
        </button>
      </div>
    </div>
  );
}