import { Link } from 'react-router-dom';
import type { CartItem } from '../App';

const lilacSmall = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.15 }}>
    <path d="M20 4C20 4 15 11 15 17C15 22 17.5 25 20 27C22.5 25 25 22 25 17C25 11 20 4 20 4Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 27V38" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
}

export default function Cart({ cart, updateQuantity }: CartProps) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price_rub * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '120px 20px',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
          {lilacSmall}
        </div>
        <h2 style={{
          fontSize: '32px',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '16px'
        }}>
          Ваша заявка пуста
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '15px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          lineHeight: 1.7,
          marginBottom: '40px'
        }}>
          Перейдите в каталог, чтобы добавить позиции для выкупа
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
            letterSpacing: '0.04em',
            cursor: 'pointer'
          }}>
            Перейти в каталог
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 38px)',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '8px'
        }}>
          Ваша заявка
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '14px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          margin: 0
        }}>
          {cart.length} {cart.length === 1 ? 'позиция' : cart.length < 5 ? 'позиции' : 'позиций'} для выкупа
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {cart.map((item) => (
          <div key={item.id} style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            border: '1px solid var(--border-light)'
          }}>
            {/* Item Image */}
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--bg-warm)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexShrink: 0
            }}>
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{ width: '90%', height: '90%', objectFit: 'contain' }}
                />
              ) : (
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.2 }}>
                  <path d="M20 6C20 6 16 12 16 17C16 21 18 23 20 25C22 23 24 21 24 17C24 12 20 6 20 6Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 25V36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>

            {/* Item Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{
                margin: '0 0 6px 0',
                fontSize: '16px',
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                color: 'var(--text-main)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {item.name}
              </h4>
              <div style={{
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                color: 'var(--text-muted)'
              }}>
                {item.price_rub.toLocaleString('ru-RU')} ₽ за шт.
              </div>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                backgroundColor: 'var(--bg-color)',
                padding: '4px',
                borderRadius: '100px',
                border: '1px solid var(--border-light)'
              }}>
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  −
                </button>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                  minWidth: '24px',
                  textAlign: 'center',
                  fontFamily: 'var(--sans)'
                }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 400,
                    color: 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--border-light)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  +
                </button>
              </div>

              <div style={{
                fontSize: '16px',
                fontWeight: 500,
                minWidth: '100px',
                textAlign: 'right',
                color: 'var(--text-main)',
                fontFamily: 'var(--sans)',
                letterSpacing: '-0.01em'
              }}>
                {(item.price_rub * item.quantity).toLocaleString('ru-RU')} ₽
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '20px',
        padding: '32px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid var(--border-light)'
      }}>
        <div>
          <div style={{
            fontSize: '13px',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            color: 'var(--text-muted)',
            letterSpacing: '0.03em',
            marginBottom: '8px'
          }}>
            Итого к оплате
          </div>
          <div style={{
            fontSize: '28px',
            fontFamily: 'var(--sans)',
            fontWeight: 400,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em'
          }}>
            {totalPrice.toLocaleString('ru-RU')} ₽
          </div>
        </div>

        <Link to="/checkout" style={{
          textDecoration: 'none'
        }}>
          <button style={{
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-color)',
            border: 'none',
            padding: '16px 36px',
            borderRadius: '100px',
            fontSize: '14px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            letterSpacing: '0.04em',
            cursor: 'pointer'
          }}>
            Оформить заявку
          </button>
        </Link>
      </div>
    </div>
  );
}

