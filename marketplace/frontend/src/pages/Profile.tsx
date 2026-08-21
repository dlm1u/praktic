import { useState } from 'react';
import axios from 'axios';

interface ProfileProps {
user: { email: string; role: string } | null;
  setUser: (user: { email: string; role: string } | null) => void;
}

export default function Profile({ user, setUser }: ProfileProps) {
  const [isLoginView, setIsLoginView] = useState(true); // Переключатель Вход / Регистрация
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isLoginView ? 'login' : 'register';

    try {
      const response = await axios.post(`http://localhost:3000/api/auth/${endpoint}`, { email, password });
      
      if (response.data.success) {
        // Сохраняем токен в localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Произошла ошибка при аутентификации');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setEmail('');
    setPassword('');
  };

  // Если пользователь уже вошел
  if (user) {
    return (
      <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '12px', border: '1px solid #444' }}>
        <h2>👤 Личный кабинет</h2>
        <p style={{ color: '#aaa', margin: '20px 0' }}>Вы вошли как: <strong>{user.email}</strong></p>
        <button 
          onClick={handleLogout}
          style={{ width: '100%', padding: '12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Выйти из аккаунта
        </button>
      </div>
    );
  }

  // Экран входа / регистрации
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', backgroundColor: '#1a1a1a', padding: '40px', borderRadius: '12px', border: '1px solid #444' }}>
      <h2>{isLoginView ? '🔑 Вход на сайт' : '📝 Регистрация'}</h2>
      
      {error && <div style={{ color: '#e74c3c', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#242424', color: '#fff' }}
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#242424', color: '#fff' }}
        />
        
        <button type="submit" style={{ padding: '12px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          {isLoginView ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#aaa' }}>
        {isLoginView ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'} {' '}
        <span 
          onClick={() => { setIsLoginView(!isLoginView); setError(''); }} 
          style={{ color: '#646cff', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isLoginView ? 'Зарегистрироваться' : 'Войти'}
        </span>
      </p>
    </div>
  );
}