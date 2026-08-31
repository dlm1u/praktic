import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface Order {
  id: number;
  user_id: number;
  total_price: number;
  status: string;
  created_at: string;
}

export default function Profile() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const statusLabels: Record<string, string> = {
    'pending_buyout': 'Ожидает проверки',
    'approved': 'Одобрена',
    'rejected': 'Отклонена',
  };

  const statusColors: Record<string, { bg: string; text: string }> = {
    'pending_buyout': { bg: '#FFF3E0', text: '#E65100' },
    'approved': { bg: '#E8F5E9', text: '#2E7D32' },
    'rejected': { bg: '#FFEBEE', text: '#C62828' },
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    if (user && user.role === 'user') {
      const token = localStorage.getItem('token');
      if (token) {
        setLoading(true);
        fetch('http://localhost:3000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => { setOrders(data); })
          .catch(() => {})
          .finally(() => setLoading(false));
      }
    }
  }, [user]);

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', paddingTop: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', opacity: 0.4 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="14" r="7" stroke="#2D2D2D" strokeWidth="1.5"/>
            <path d="M8 34C8 29 13 26 20 26C27 26 32 29 32 34" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 36px)',
          fontWeight: 300,
          fontFamily: 'var(--serif)',
          color: 'var(--text-main)',
          marginBottom: '8px'
        }}>
          Личный кабинет
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '14px',
          fontFamily: 'var(--sans)',
          fontWeight: 300
        }}>
          Управление заявками и профилем
        </p>
      </div>

      {user ? (
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '36px',
          borderRadius: '20px',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-warm)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
              fontSize: '24px',
              fontFamily: 'var(--serif)',
              color: 'var(--text-muted)'
            }}>
              {user.email[0].toUpperCase()}
            </div>
            <h3 style={{
              margin: '0 0 4px 0',
              fontSize: '18px',
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              color: 'var(--text-main)'
            }}>
              {user.email}
            </h3>
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-light)'
            }}>
              {user.role === 'admin' ? 'Администратор' : 'Клиент'}
            </span>
          </div>

          {user.role === 'user' && (
            <>
              <Link to="/cart" style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg-color)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                textAlign: 'center',
                marginBottom: '12px'
              }}>
                🛒 Перейти в корзину
              </Link>

              <div style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-color)'
              }}>
                <h4 style={{
                  margin: '0 0 16px 0',
                  fontSize: '14px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  История заказов
                </h4>

                {loading ? (
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 300,
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    padding: '16px 0'
                  }}>
                    Загрузка...
                  </p>
                ) : orders.length === 0 ? (
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 300,
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    padding: '16px 0'
                  }}>
                    У вас пока нет заказов
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {orders.map((order) => {
                      const s = statusColors[order.status] || statusColors['pending_buyout'];
                      return (
                        <div key={order.id} style={{
                          backgroundColor: 'var(--bg-color)',
                          borderRadius: '12px',
                          padding: '16px',
                          border: '1px solid var(--border-color)'
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
                              color: 'var(--text-muted)',
                              fontWeight: 300
                            }}>
                              #{order.id} · {formatDate(order.created_at)}
                            </span>
                            <span style={{
                              display: 'inline-block',
                              padding: '3px 10px',
                              borderRadius: '100px',
                              fontSize: '11px',
                              fontFamily: 'var(--sans)',
                              fontWeight: 500,
                              backgroundColor: s.bg,
                              color: s.text
                            }}>
                              {statusLabels[order.status] || order.status}
                            </span>
                          </div>
                          <div style={{
                            fontSize: '16px',
                            fontFamily: 'var(--sans)',
                            fontWeight: 500,
                            color: 'var(--text-main)'
                          }}>
                            {order.total_price.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              fontSize: '13px',
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              marginTop: '24px'
            }}
          >
            Выйти
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '20px' }}>
            Для просмотра заказов необходимо войти в аккаунт
          </p>
          <Link to="/login" style={{
            display: 'inline-block',
            padding: '14px 32px',
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-color)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            textDecoration: 'none',
            cursor: 'pointer'
          }}>
            Войти
          </Link>
        </div>
      )}
    </div>
  );
}
