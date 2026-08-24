import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const lilacSmall = (
  <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.3 }}>
    <path d="M20 6C20 6 16 12 16 17C16 21 18 23 20 25C22 23 24 21 24 17C24 12 20 6 20 6Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 25V36" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 31C17 29 14 30 13 32" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 34C23 32 26 33 27 35" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const deliveryOptions = [
  { value: 1500, label: 'Стандарт', timeframe: '14–21 день', description: 'Бережная доставка с полным отслеживанием' },
  { value: 3500, label: 'Экспресс', timeframe: '7–10 дней', description: 'Приоритетная обработка и ускоренная доставка' },
  { value: 7000, label: 'VIP', timeframe: '3–5 дней', description: 'Персональное сопровождение и курьерская доставка' },
];

export default function ProductDetail({ addToCart }: { addToCart: (p: any) => void }) {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [selectedDelivery, setSelectedDelivery] = useState(1500);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) return (
    <div style={{ textAlign: 'center', marginTop: '100px', color: 'var(--text-muted)', fontFamily: 'var(--sans)', fontWeight: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', opacity: 0.3 }}>
        {lilacSmall}
      </div>
      <p style={{ fontSize: '16px' }}>Загрузка...</p>
    </div>
  );

  const finalPrice = data.price_rub + selectedDelivery;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '40px' }}>
      {/* Breadcrumb */}
      <Link to="/catalog" style={{
        color: 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '13px',
        fontFamily: 'var(--sans)',
        fontWeight: 300,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '56px',
        transition: 'color 0.3s ease'
      }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Вернуться в каталог
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'start'
      }}>
        {/* Image Section */}
        <div style={{
          backgroundColor: 'var(--bg-warm)',
          borderRadius: '24px',
          padding: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '500px',
          position: 'relative'
        }}>
          {data.image_url ? (
            <img
              src={data.image_url}
              alt={data.name}
              style={{
                width: '100%',
                maxHeight: '450px',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--text-light)' }}>
              {lilacSmall}
              <span style={{ fontSize: '13px', fontFamily: 'var(--sans)', letterSpacing: '0.05em' }}>Изображение</span>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '8px' }}>
          {data.brand && (
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-light)',
              marginBottom: '16px'
            }}>
              {data.brand}
            </span>
          )}

          <h1 style={{
            margin: '0 0 20px 0',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontFamily: 'var(--serif)',
            fontWeight: 300,
            color: 'var(--text-main)',
            lineHeight: 1.2
          }}>
            {data.name}
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '15px',
            lineHeight: 1.8,
            margin: '0 0 40px 0',
            fontFamily: 'var(--sans)',
            fontWeight: 300
          }}>
            {data.description}
          </p>

          {/* Price */}
          <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: `1px solid var(--border-light)` }}>
            <div style={{
              color: 'var(--text-light)',
              fontSize: '13px',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              marginBottom: '8px',
              letterSpacing: '0.02em'
            }}>
              Рекомендованная цена в бутике: ${data.price_usd}
            </div>
            <div style={{
              fontSize: '32px',
              fontFamily: 'var(--sans)',
              fontWeight: 400,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em'
            }}>
              {data.price_rub.toLocaleString('ru-RU')} ₽
            </div>
          </div>

          {/* Delivery Options */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '20px'
            }}>
              Способ доставки
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {deliveryOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => setSelectedDelivery(option.value)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '20px 24px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    border: selectedDelivery === option.value ? '1px solid var(--text-main)' : `1px solid var(--border-light)`,
                    backgroundColor: selectedDelivery === option.value ? 'var(--text-main)' : 'transparent',
                    transition: 'all 0.3s ease',
                    color: selectedDelivery === option.value ? 'var(--bg-color)' : 'var(--text-main)'
                  }}
                >
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontFamily: 'var(--sans)',
                      fontWeight: selectedDelivery === option.value ? 500 : 400,
                      marginBottom: '4px'
                    }}>
                      {option.label} — {option.timeframe}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      fontFamily: 'var(--sans)',
                      fontWeight: 300,
                      opacity: selectedDelivery === option.value ? 0.7 : 0.6
                    }}>
                      {option.description}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}>
                    +{option.value.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => addToCart({ ...data, price_rub: finalPrice })}
            style={{
              width: '100%',
              padding: '20px',
              backgroundColor: 'var(--text-main)',
              color: 'var(--bg-color)',
              border: 'none',
              borderRadius: '14px',
              fontSize: '15px',
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Оставить заявку на выкуп — {finalPrice.toLocaleString('ru-RU')} ₽
          </button>

          {/* Trust indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: `1px solid var(--border-light)`
          }}>
            {[
              { icon: '✓', label: 'Оригинал' },
              { icon: '🔒', label: 'Безопасно' },
              { icon: '✈', label: 'По миру' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.5 }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span style={{ fontSize: '10px', fontFamily: 'var(--sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
