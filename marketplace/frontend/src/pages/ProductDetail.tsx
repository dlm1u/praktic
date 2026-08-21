import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail({ addToCart }: { addToCart: (p: any) => void }) {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [deliveryCost, setDeliveryCost] = useState<number>(1500);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--text-muted)' }}>Загрузка...</div>;

  const finalPrice = data.price_rub + deliveryCost;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <Link to="/catalog" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '24px' }}>
        ← Вернуться в каталог
      </Link>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px', 
        backgroundColor: 'var(--card-bg)', 
        padding: '40px', 
        borderRadius: '24px' 
      }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={data.image_url} alt={data.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: '0 0 16px 0', fontSize: '32px', color: 'var(--text-main)' }}>{data.name}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', margin: '0 0 32px 0' }}>{data.description}</p>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '14px', marginBottom: '4px' }}>
              Бутик: ${data.price_usd}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-main)' }}>
              {data.price_rub.toLocaleString()} ₽
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            <div onClick={() => setDeliveryCost(1500)} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
              border: deliveryCost === 1500 ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
              backgroundColor: deliveryCost === 1500 ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
              color: 'var(--text-main)'
            }}>
              <span>Стандарт (14-21 день)</span>
              <strong>+1 500 ₽</strong>
            </div>

            <div onClick={() => setDeliveryCost(3500)} style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
              border: deliveryCost === 3500 ? '2px solid var(--accent-blue)' : '1px solid var(--border-color)',
              backgroundColor: deliveryCost === 3500 ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
              color: 'var(--text-main)'
            }}>
              <span>Экспресс (7-10 дней)</span>
              <strong>+3 500 ₽</strong>
            </div>
          </div>

          <button onClick={() => addToCart({ ...data, price_rub: finalPrice })} style={{ 
            width: '100%', padding: '18px', backgroundColor: 'var(--text-main)', color: 'var(--bg-color)', 
            border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, 
            cursor: 'pointer', marginTop: 'auto'
          }}>
            Оформить выкуп ({finalPrice.toLocaleString()} ₽)
          </button>
        </div>
      </div>
    </div>
  );
}