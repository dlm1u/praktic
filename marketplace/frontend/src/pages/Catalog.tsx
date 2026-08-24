import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const lilacOutline = (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M20 4C20 4 16 10 16 16C16 20 18 22 20 24C22 22 24 20 24 16C24 10 20 4 20 4Z" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 24V38" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M20 30C17 28 14 29 13 31" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M20 33C23 31 26 32 27 34" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 14C12 14 8 12 7 14" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M28 14C28 14 32 12 33 14" stroke="#2D2D2D" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const lilacLarge = (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M20 2C20 2 14 10 14 18C14 23 17 26 20 28C23 26 26 23 26 18C26 10 20 2 20 2Z" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28V39" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 33C16 30 12 32 11 35" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 36C24 33 28 34 29 37" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 13C10 13 6 10 5 13" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M30 13C30 13 34 10 35 13" stroke="#2D2D2D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const brands = ['Все бренды', 'Gucci', 'Prada', 'Louis Vuitton', 'Hermès', 'Chanel', 'Coach', 'Bottega Veneta', 'Dior'];

export default function Catalog({ addToCart }: { addToCart: (p: any) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('Все бренды');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/products').then((res) => setProducts(res.data));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesBrand = selectedBrand === 'Все бренды' || p.brand?.toLowerCase().includes(selectedBrand.toLowerCase()) || selectedBrand === 'Все бренды';
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesBrand && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          {lilacLarge}
        </div>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 300,
          margin: '0 0 20px 0',
          color: 'var(--text-main)',
          fontFamily: 'var(--serif)',
          lineHeight: 1.2
        }}>
          Персональный консьерж
        </h2>
        <p style={{
          color: 'var(--text-muted)',
          margin: 0,
          fontSize: '17px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          maxWidth: '560px',
          marginInline: 'auto',
          lineHeight: 1.7
        }}>
          Индивидуальный выкуп оригинальных брендовых сумок<br/>
          из официальных бутиков Европы и мира
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '56px', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
          <input
            type="text"
            placeholder="Поиск по каталогу…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px 14px 48px',
              fontSize: '15px',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--text-main)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 16L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              style={{
                padding: '10px 20px',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: selectedBrand === brand ? 500 : 400,
                letterSpacing: '0.02em',
                backgroundColor: selectedBrand === brand ? 'var(--text-main)' : 'transparent',
                color: selectedBrand === brand ? 'var(--bg-color)' : 'var(--text-muted)',
                border: `1px solid ${selectedBrand === brand ? 'var(--text-main)' : 'var(--border-color)'}`,
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
        {filteredProducts.map((p) => (
          <div key={p.id} style={{
            backgroundColor: 'var(--card-bg)',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.4s ease',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(45,45,45,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ width: '100%', height: '300px', backgroundColor: 'var(--bg-warm)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.name}
                  style={{ width: '80%', height: '80%', objectFit: 'contain', transition: 'transform 0.6s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'var(--text-light)' }}>
                  {lilacOutline}
                  <span style={{ fontSize: '12px', fontFamily: 'var(--sans)', letterSpacing: '0.05em' }}>Изображение</span>
                </div>
              )}
            </div>
            <div style={{ padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ marginBottom: '6px' }}>
                {p.brand && (
                  <span style={{
                    fontSize: '11px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-light)'
                  }}>
                    {p.brand}
                  </span>
                )}
              </div>
              <Link to={`/product/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '22px', fontFamily: 'var(--serif)', fontWeight: 400, color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {p.name}
                </h3>
              </Link>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 24px 0', fontFamily: 'var(--sans)', fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {p.description}
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `1px solid var(--border-light)`, paddingTop: '20px' }}>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--sans)', fontWeight: 400, color: 'var(--text-light)', marginBottom: '4px', letterSpacing: '0.03em' }}>
                    Рекомендованная цена: ${p.price_usd}
                  </div>
                  <div style={{ fontSize: '22px', fontFamily: 'var(--sans)', fontWeight: 500, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    {p.price_rub.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    backgroundColor: 'var(--text-main)',
                    color: 'var(--bg-color)',
                    border: 'none',
                    padding: '12px 22px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontFamily: 'var(--sans)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)', fontFamily: 'var(--sans)', fontWeight: 300 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', opacity: 0.4 }}>
            {lilacLarge}
          </div>
          <p style={{ fontSize: '18px', margin: 0 }}>
            В данный момент нет доступных позиций
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px', color: 'var(--text-light)' }}>
            Свяжитесь с нашим консьержем для индивидуального заказа
          </p>
        </div>
      )}
    </div>
  );
}
