import { useState } from 'react';

interface ProfileProps {
  user: { email: string; role: string } | null;
  setUser: (u: { email: string; role: string } | null) => void;
}

export default function Profile({ user, setUser }: ProfileProps) {
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setUser({ email, role: email.includes('admin') ? 'admin' : 'user' });
      setMessage(`Добро пожаловать, ${email}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setMessage('Вы вышли из аккаунта');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', paddingTop: '60px' }}>
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
          {user ? 'Личный кабинет' : 'Вход в аккаунт'}
        </h1>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '14px',
          fontFamily: 'var(--sans)',
          fontWeight: 300
        }}>
          {user ? 'Управление заявками и профилем' : 'Персональный доступ к сервису'}
        </p>
      </div>

      {message && (
        <div style={{
          textAlign: 'center',
          padding: '14px 20px',
          backgroundColor: 'var(--bg-warm)',
          borderRadius: '12px',
          marginBottom: '24px',
          fontSize: '13px',
          fontFamily: 'var(--sans)',
          fontWeight: 300,
          color: 'var(--text-main)',
          border: '1px solid var(--border-light)'
        }}>
          {message}
        </div>
      )}

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

          <button
            onClick={handleLogout}
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
              letterSpacing: '0.02em'
            }}
          >
            Выйти
          </button>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'var(--card-bg)',
          padding: '36px',
          borderRadius: '20px',
          border: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: '10px',
                  fontSize: '12px',
                  fontFamily: 'var(--sans)',
                  fontWeight: mode === m ? 500 : 400,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  backgroundColor: mode === m ? 'var(--text-main)' : 'transparent',
                  color: mode === m ? 'var(--bg-color)' : 'var(--text-muted)',
                  border: `1px solid ${mode === m ? 'var(--text-main)' : 'var(--border-color)'}`,
                  borderRadius: '100px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {m === 'login' ? 'Войти' : 'Регистрация'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="email"
                placeholder="Email"
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
              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'var(--text-main)',
                color: 'var(--bg-color)',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: 'var(--sans)',
                fontWeight: 500,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
