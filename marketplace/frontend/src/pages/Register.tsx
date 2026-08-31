import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '40px' }}>
      <h2>Регистрация</h2>
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
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '14px 16px',
            fontSize: '15px',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            color: 'var(--text-main)',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder="Пароль (мин. 6 символов)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={{
            padding: '14px 16px',
            fontSize: '15px',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            color: 'var(--text-main)',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            padding: '14px 16px',
            fontSize: '15px',
            fontFamily: 'var(--sans)',
            fontWeight: 300,
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            color: 'var(--text-main)',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '16px',
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-color)',
            border: 'none',
            borderRadius: '12px',
            fontSize: '15px',
            fontFamily: 'var(--sans)',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px', color: 'var(--text-muted)' }}>
        Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--text-main)', textDecoration: 'underline' }}>Войти</Link>
      </p>
    </div>
  );
}
