import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // TODO: Здесь будет запрос к Laravel API
    // try {
    //   const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
    //   localStorage.setItem('token', response.data.token);
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError('Nepareizs e-pasts vai parole');
    // }
    
    // Временная заглушка для демонстрации
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Laipni lūdzam!</h1>
          <p>Ielogojieties savā kontā</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">E-pasts</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jūsu@epasts.lv"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Parole</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">Ielogoties</button>
        </form>
        
        <div className="auth-footer">
          <p>Nav konta? <Link to="/register">Reģistrēties</Link></p>
        </div>
      </div>
    </div>
  );
}
