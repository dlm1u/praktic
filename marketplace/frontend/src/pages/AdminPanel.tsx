import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceUsd, setPriceUsd] = useState(0);
  const [priceRub, setPriceRub] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [brand, setBrand] = useState('');
  
  const token = localStorage.getItem('token');

  const refreshProducts = () => {
    axios.get('http://localhost:3000/api/products').then(res => setProducts(res.data));
  };

  const refreshOrders = () => {
    axios.get('http://localhost:3000/api/admin/orders', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));
  };

  useEffect(() => { refreshProducts(); refreshOrders(); }, []);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/products', { 
      name, description, brand, price_usd: priceUsd, price_rub: priceRub, image_url: imageUrl 
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName(''); setDescription(''); setBrand(''); setPriceUsd(0); setPriceRub(0); setImageUrl('');
    refreshProducts();
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refreshProducts();
  };

  const handleApprove = async (orderId: number) => {
    await axios.patch(
      `http://localhost:3000/api/admin/orders/${orderId}`,
      { status: 'approved' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refreshOrders();
  };

  const handleReject = async (orderId: number) => {
    await axios.patch(
      `http://localhost:3000/api/admin/orders/${orderId}`,
      { status: 'rejected' },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    refreshOrders();
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '40px' }}>
      <h1 style={{
        fontSize: 'clamp(28px, 4vw, 38px)',
        fontWeight: 300,
        fontFamily: 'var(--serif)',
        color: 'var(--text-main)',
        marginBottom: '48px',
        textAlign: 'center'
      }}>
        Панель управления
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Form */}
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '32px',
          borderRadius: '20px',
          border: '1px solid var(--border-light)',
          position: 'sticky',
          top: '100px'
        }}>
          <div style={{
            fontSize: '12px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '28px'
          }}>
            Добавить позицию
          </div>

          <form onSubmit={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{
                fontSize: '11px',
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em'
              }}>
                Бренд
              </label>
              <input
                type="text"
                placeholder="Gucci, Prada..."
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '13px',
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
                fontSize: '11px',
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em'
              }}>
                Название
              </label>
              <input
                type="text"
                placeholder="Название модели"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '13px',
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
                fontSize: '11px',
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em'
              }}>
                Описание
              </label>
              <textarea
                placeholder="Описание модели"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '13px',
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{
                  fontSize: '11px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '6px',
                  letterSpacing: '0.03em'
                }}>
                  Цена ($ бутик)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceUsd || ''}
                  onChange={(e) => setPriceUsd(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '13px',
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
                  fontSize: '11px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 400,
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginBottom: '6px',
                  letterSpacing: '0.03em'
                }}>
                  Цена (₽)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={priceRub || ''}
                  onChange={(e) => setPriceRub(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '13px',
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
            </div>

            <div>
              <label style={{
                fontSize: '11px',
                fontFamily: 'var(--sans)',
                fontWeight: 400,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '6px',
                letterSpacing: '0.03em'
              }}>
                Ссылка на изображение
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  fontSize: '13px',
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

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg-color)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              Добавить в каталог
            </button>
          </form>
        </div>

        {/* Product List */}
        <div>
          <div style={{
            fontSize: '12px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '20px'
          }}>
            Каталог ({products.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {products.map((p) => (
              <div key={p.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '14px',
                border: '1px solid var(--border-light)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'var(--bg-warm)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.2 }}>
                        <path d="M20 6C20 6 16 12 16 17C16 21 18 23 20 25C22 23 24 21 24 17C24 12 20 6 20 6Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 25V36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontFamily: 'var(--sans)',
                      fontWeight: 400,
                      color: 'var(--text-main)'
                    }}>
                      {p.name}
                    </div>
                    {p.brand && (
                      <div style={{
                        fontSize: '11px',
                        fontFamily: 'var(--sans)',
                        fontWeight: 300,
                        color: 'var(--text-light)',
                        letterSpacing: '0.05em'
                      }}>
                        {p.brand}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    fontSize: '14px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 500,
                    color: 'var(--text-main)'
                  }}>
                    {p.price_rub.toLocaleString('ru-RU')} ₽
                  </span>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-light)',
                      border: '1px solid var(--border-color)',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontFamily: 'var(--sans)',
                      fontWeight: 400,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--text-main)';
                      e.currentTarget.style.color = 'var(--bg-color)';
                      e.currentTarget.style.borderColor = 'var(--text-main)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-light)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders */}
        <div>
          <div style={{
            fontSize: '12px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '20px'
          }}>
            Заявки ({orders.length})
          </div>

          {orders.length === 0 ? (
            <p style={{
              fontSize: '13px',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '40px 0'
            }}>
              Заявок пока нет
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orders.map((order: any) => {
                const statusLabels: Record<string, string> = {
                  'pending_buyout': 'Ожидает',
                  'approved': 'Одобрена',
                  'rejected': 'Отклонена',
                };
                const statusColors: Record<string, { bg: string; text: string }> = {
                  'pending_buyout': { bg: '#FFF3E0', text: '#E65100' },
                  'approved': { bg: '#E8F5E9', text: '#2E7D32' },
                  'rejected': { bg: '#FFEBEE', text: '#C62828' },
                };
                const s = statusColors[order.status] || statusColors['pending_buyout'];
                const isPending = order.status === 'pending_buyout';

                return (
                  <div key={order.id} style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid var(--border-light)',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '13px',
                          fontFamily: 'var(--sans)',
                          fontWeight: 500,
                          color: 'var(--text-main)',
                          marginBottom: '4px'
                        }}>
                          Заказ #{order.id}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          fontFamily: 'var(--sans)',
                          fontWeight: 300,
                          color: 'var(--text-light)'
                        }}>
                          {order.user_email}
                        </div>
                      </div>
                      <span style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        fontSize: '10px',
                        fontFamily: 'var(--sans)',
                        fontWeight: 500,
                        backgroundColor: s.bg,
                        color: s.text,
                        whiteSpace: 'nowrap'
                      }}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </div>
                    <div style={{
                      fontSize: '15px',
                      fontFamily: 'var(--sans)',
                      fontWeight: 500,
                      color: 'var(--text-main)',
                      marginBottom: '4px'
                    }}>
                      {order.total_price.toLocaleString('ru-RU')} ₽
                    </div>
                    {order.customer_name && (
                      <div style={{
                        fontSize: '11px',
                        fontFamily: 'var(--sans)',
                        fontWeight: 300,
                        color: 'var(--text-light)',
                        marginBottom: '2px'
                      }}>
                        👤 {order.customer_name}
                      </div>
                    )}
                    {order.customer_phone && (
                      <div style={{
                        fontSize: '11px',
                        fontFamily: 'var(--sans)',
                        fontWeight: 300,
                        color: 'var(--text-light)',
                        marginBottom: '2px'
                      }}>
                        📞 {order.customer_phone}
                      </div>
                    )}
                    {order.customer_email && (
                      <div style={{
                        fontSize: '11px',
                        fontFamily: 'var(--sans)',
                        fontWeight: 300,
                        color: 'var(--text-light)',
                        marginBottom: '2px'
                      }}>
                        ✉️ {order.customer_email}
                      </div>
                    )}
                    {order.customer_address && (
                      <div style={{
                        fontSize: '11px',
                        fontFamily: 'var(--sans)',
                        fontWeight: 300,
                        color: 'var(--text-light)',
                        marginBottom: '2px'
                      }}>
                        📍 {order.customer_address}
                      </div>
                    )}
                    <div style={{
                      fontSize: '10px',
                      fontFamily: 'var(--sans)',
                      fontWeight: 300,
                      color: 'var(--text-light)',
                      marginBottom: '12px'
                    }}>
                      {new Date(order.created_at).toLocaleString('ru-RU')}
                    </div>
                    {isPending && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleApprove(order.id)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: '#2E7D32',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontFamily: 'var(--sans)',
                            fontWeight: 500,
                            cursor: 'pointer'
                          }}
                        >
                          ✓ Одобрить
                        </button>
                        <button
                          onClick={() => handleReject(order.id)}
                          style={{
                            flex: 1,
                            padding: '8px',
                            backgroundColor: 'transparent',
                            color: '#C62828',
                            border: '1px solid #C62828',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontFamily: 'var(--sans)',
                            fontWeight: 500,
                            cursor: 'pointer'
                          }}
                        >
                          ✕ Отклонить
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
