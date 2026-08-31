import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const lilacLogo = (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
    <path d="M20 3C20 3 14.5 10.5 14.5 17.5C14.5 22.5 17 25.5 20 28C23 25.5 25.5 22.5 25.5 17.5C25.5 10.5 20 3 20 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 28V38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 33C17 31 14 32 13 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M20 36C23 34 26 35 27 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Header({ cartCount }: { cartCount: number }) {
  const { user, isAdmin, logout } = useAuth();

  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-color)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Левая часть: Логотип + Каталог + Заявка */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--text-main)',
            marginRight: '16px'
          }}>
            {lilacLogo}
            <span style={{
              fontSize: '18px',
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              letterSpacing: '0.02em'
            }}>
              Concierge
            </span>
          </Link>

          <Link to="/catalog" style={{
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '14px',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            padding: '8px 14px',
            borderRadius: '100px',
            letterSpacing: '0.02em',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-main)';
              e.currentTarget.style.backgroundColor = 'var(--border-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Каталог
          </Link>

          {user && (
            <Link to="/cart" style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontSize: '14px',
              fontFamily: 'var(--sans)',
              fontWeight: 300,
              padding: '8px 14px',
              borderRadius: '100px',
              letterSpacing: '0.02em',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-main)';
                e.currentTarget.style.backgroundColor = 'var(--border-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Заявка ({cartCount})
            </Link>
          )}
        </nav>

        {/* Правая часть: Профиль/Вход */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  padding: '8px 14px',
                  borderRadius: '100px',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-main)';
                    e.currentTarget.style.backgroundColor = 'var(--border-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Настройки
                </Link>
              )}

              <Link to="/profile" style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                padding: '8px 16px',
                borderRadius: '100px',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-main)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M6 20C6 17 8.5 15 12 15C15.5 15 18 17 18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {user.email}
              </Link>

              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontFamily: 'var(--sans)',
                  fontWeight: 300,
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                padding: '8px 14px',
                borderRadius: '100px',
                transition: 'color 0.3s'
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                Войти
              </Link>
              <Link to="/register" style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                padding: '8px 14px',
                borderRadius: '100px',
                transition: 'color 0.3s'
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
