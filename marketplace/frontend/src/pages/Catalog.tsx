import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Catalog({ addToCart }: { addToCart: (p: any) => void }) {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 12px 0', color: 'var(--text-main)' }}>
          Каталог выкупа
        </h2>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '16px' }}>
          Оригинальные сумки из официальных бутиков Европы
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px' 
      }}>
        {products.map((p) => (
          <div key={p.id} style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderRadius: '16px', 
            padding: '16px',
            display: 'flex', 
            flexDirection: 'column'
          }}>
            <div style={{ 
              width: '100%', 
              height: '240px', 
              backgroundColor: '#fff', 
              borderRadius: '12px', 
              overflow: 'hidden',
              marginBottom: '16px'
            }}>
              <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
              <div>
                <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{p.name}</h3>
                </Link>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    Бутик: ${p.price_usd}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {p.price_rub.toLocaleString()} ₽
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(p)} 
                  style={{ 
                    backgroundColor: 'var(--text-main)', 
                    color: 'var(--bg-color)', 
                    border: 'none', 
                    padding: '10px 16px', 
                    borderRadius: '8px',
                    fontSize: '14px', 
                    fontWeight: 600, 
                    cursor: 'pointer'
                  }}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}