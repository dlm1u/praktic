import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CartItem } from '../App';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

export default function Checkout({ cart }: CheckoutProps) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price_rub * item.quantity, 0);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !phone || !name) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    // Функция оплаты еще не реализована по условию
    alert('Ошибка: Данная функция еще не реализована!');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Link to="/cart" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '24px' }}>
        ← Вернуться в корзину
      </Link>

      <div style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderRadius: '24px', 
        padding: '40px',
        color: 'var(--text-main)'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 8px 0' }}>
          Оформление заказа
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: '0 0 24px 0' }}>
          Введите адрес доставки и контактные данные для получения выкупа
        </p>

        <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              Получатель (ФИО)
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Иванова Анна Сергеевна"
              style={{ 
                width: '100%', padding: '14px 20px', borderRadius: '12px', 
                border: '1px solid var(--border-color)', fontSize: '14px',
                backgroundColor: 'var(--bg-color)', color: '#fff', boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              Адрес доставки (Город, улица, дом, кв.)
            </label>
            <textarea 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="г. Москва, ул. Тверская, д. 1, кв. 10"
              rows={3}
              style={{ 
                width: '100%', padding: '14px 20px', borderRadius: '12px', 
                border: '1px solid var(--border-color)', fontSize: '14px',
                backgroundColor: 'var(--bg-color)', color: '#fff', boxSizing: 'border-box',
                resize: 'none', fontFamily: 'inherit'
              }}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
              Номер телефона
            </label>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+7 (999) 000-00-00"
              style={{ 
                width: '100%', padding: '14px 20px', borderRadius: '12px', 
                border: '1px solid var(--border-color)', fontSize: '14px',
                backgroundColor: 'var(--bg-color)', color: '#fff', boxSizing: 'border-box'
              }}
              required
            />
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>
              <span>К оплате:</span>
              <span style={{ fontSize: '20px', color: 'var(--accent-blue)' }}>{totalPrice.toLocaleString()} ₽</span>
            </div>

            <button 
              type="submit" 
              style={{ 
                width: '100%', padding: '16px', 
                backgroundColor: 'var(--text-main)', 
                color: 'var(--bg-color)', 
                border: 'none', 
                borderRadius: '12px', 
                fontSize: '16px', 
                fontWeight: 600, 
                cursor: 'pointer'
              }}
            >
              Оплатить заказ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}