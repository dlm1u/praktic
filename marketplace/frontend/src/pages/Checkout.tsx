import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import type { CartItem } from '../App';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

export default function Checkout({ cart, clearCart }: CheckoutProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price_rub * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map(({ id, name, description, price_rub, price_usd, image_url, quantity }) => ({
            id, name, description, price_rub, price_usd, image_url, quantity,
          })),
          total_rub: totalPrice,
          customer_name: name.trim(),
          customer_phone: phone.trim(),
          customer_email: email.trim(),
          customer_address: address.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setError(data.error || 'Ошибка при оформлении заявки');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка соединения с сервером');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '120px 20px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#E8F5E9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto 24px',
          fontSize: '28px',
          color: '#2E7D32'
        }}>
          ✓
        </div>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '16px'
        }}>
          Заявка оформлена!
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '15px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          lineHeight: 1.7
        }}>
          Перенаправляем в личный кабинет...
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '120px 20px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '16px'
        }}>
          Корзина пуста
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '15px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          marginBottom: '32px'
        }}>
          Добавьте товары в корзину для оформления заявки
        </p>
        <Link to="/catalog">
          <button style={{
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-color)',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '100px',
            fontSize: '14px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            Перейти в каталог
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 38px)',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '8px'
        }}>
          Оформление заявки
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '14px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          margin: 0
        }}>
          Заполните данные для обработки вашего заказа
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Форма */}
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '36px',
          borderRadius: '20px',
          border: '1px solid var(--border-light)'
        }}>
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                fontSize: '12px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em'
              }}>
                ФИО *
              </label>
              <input
                type="text"
                placeholder="Иванов Иван Иванович"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '12px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em'
              }}>
                Телефон *
              </label>
              <input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '12px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em'
              }}>
                Email *
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{
                fontSize: '12px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '0.03em'
              }}>
                Адрес доставки *
              </label>
              <textarea
                placeholder="Город, улица, дом, квартира, индекс"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '14px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  backgroundColor: 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                padding: '18px',
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg-color)',
                border: 'none',
                borderRadius: '14px',
                fontSize: '15px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                letterSpacing: '0.04em',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.6 : 1,
                marginTop: '8px'
              }}
            >
              {submitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </div>

        {/* Итого */}
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '32px',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{
            margin: '0 0 24px 0',
            fontSize: '18px',
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            color: 'var(--text-main)'
          }}>
            Ваш заказ
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {cart.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'var(--bg-warm)',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  fontSize: '12px',
                  color: 'var(--text-light)'
                }}>
                  {item.quantity}x
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '13px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 400,
                    color: 'var(--text-main)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 300,
                    color: 'var(--text-muted)'
                  }}>
                    {item.price_rub.toLocaleString('ru-RU')} ₽ × {item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <span style={{
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                color: 'var(--text-muted)'
              }}>
                Позиций:
              </span>
              <span style={{
                fontSize: '14px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-main)'
              }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <span style={{
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                color: 'var(--text-muted)'
              }}>
                Доставка:
              </span>
              <span style={{
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                color: 'var(--text-muted)'
              }}>
                Включена
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)'
            }}>
              <span style={{
                fontSize: '16px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-main)'
              }}>
                Итого:
              </span>
              <span style={{
                fontSize: '24px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                color: 'var(--text-main)'
              }}>
                {totalPrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <p style={{
              margin: 0,
              fontSize: '12px',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              color: 'var(--text-muted)',
              lineHeight: 1.6
            }}>
              После отправки заявки наш менеджер свяжется с вами для подтверждения заказа.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
