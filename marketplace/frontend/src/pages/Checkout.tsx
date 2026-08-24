import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CartItem } from '../App';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const lilacSmall = (
  <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.3 }}>
    <path d="M20 6C20 6 16 12 16 17C16 21 18 23 20 25C22 23 24 21 24 17C24 12 20 6 20 6Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 25V36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Checkout({ cart, clearCart }: CheckoutProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price_rub * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (submitted) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '100px 20px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--text-main)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 32px',
          color: 'var(--bg-color)',
          fontSize: '28px'
        }}>
          &#10003;
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '16px'
        }}>
          Заявка отправлена
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '15px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          lineHeight: 1.7
        }}>
          Наш консьерж свяжется с вами<br/>в ближайшее время
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '16px' }}>
          Корзина пуста
        </p>
        <Link to="/catalog" style={{ color: 'var(--text-main)', fontSize: '14px', fontFamily: 'var(--sans)', marginTop: '16px', display: 'inline-block' }}>
          &#8592; Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '40px' }}>
      <Link to="/cart" style={{
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '13px',
        fontFamily: 'var(--sans)',
        fontWeight: 300,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '48px'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Вернуться к заявке
      </Link>

      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: 300,
        fontFamily: 'var(--serif)',
        color: 'var(--text-main)',
        marginBottom: '48px',
        textAlign: 'center'
      }}>
        Оформление заявки
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '32px', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '24px'
            }}>
              Контактные данные
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Имя</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Ваше имя" style={{ width: '100%', padding: '14px 16px', fontSize: '14px', fontFamily: 'var(--sans)', fontWeight: 300, backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="email@example.com" style={{ width: '100%', padding: '14px 16px', fontSize: '14px', fontFamily: 'var(--sans)', fontWeight: 300, backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Телефон</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required placeholder="+7 (___) ___-__-__" style={{ width: '100%', padding: '14px 16px', fontSize: '14px', fontFamily: 'var(--sans)', fontWeight: 300, backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Комментарий</label>
                <textarea value={formData.comment} onChange={(e) => setFormData({ ...formData, comment: e.target.value })} placeholder="Особые пожелания..." rows={3} style={{ width: '100%', padding: '14px 16px', fontSize: '14px', fontFamily: 'var(--sans)', fontWeight: 300, backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-main)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          <button type="submit" style={{ width: '100%', padding: '18px', backgroundColor: 'var(--text-main)', color: 'var(--bg-color)', border: 'none', borderRadius: '14px', fontSize: '15px', fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '0.04em', cursor: 'pointer' }}>
            Подтвердить заявку
          </button>
        </form>

        <div>
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '32px', borderRadius: '20px', border: '1px solid var(--border-light)', marginBottom: '20px' }}>
            <div style={{ fontSize: '12px', fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '24px' }}>Ваш заказ</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: 'var(--bg-warm)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : (
                        lilacSmall
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', fontFamily: 'var(--sans)', fontWeight: 300, color: 'var(--text-light)' }}>&#215; {item.quantity}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--text-main)' }}>
                    {(item.price_rub * item.quantity).toLocaleString('ru-RU')} &#8381;
                  </div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-muted)' }}>Итого</span>
              <span style={{ fontSize: '20px', fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                {total.toLocaleString('ru-RU')} &#8381;
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              '100&#37; оригинальная продукция',
              'Прямые закупки из бутиков',
              'Полное отслеживание заказа',
              'Гарантия возврата средств',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontFamily: 'var(--sans)', fontWeight: 300, color: 'var(--text-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
