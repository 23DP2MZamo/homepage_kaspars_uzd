import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import './Register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== passwordConfirmation) {
      setError('Paroles nesakrīt');
      return;
    }
    
    // TODO: Здесь будет запрос к Laravel API
    // try {
    //   const response = await axios.post('http://127.0.0.1:8000/api/register', {
    //     name, email, password, password_confirmation: passwordConfirmation
    //   });
    //   localStorage.setItem('token', response.data.token);
    //   navigate('/dashboard');
    // } catch (err) {
    //   setError(err.response?.data?.message || 'Reģistrācijas kļūda');
    // }
    
    // Временная заглушка для демонстрации
    navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Izveidot kontu</h1>
          <p>Sāciet organizēt savus uzdevumus</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Vārds</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jūsu vārds"
              required
            />
          </div>
          
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
          
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Apstiprināt paroli</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">Reģistrēties</button>
        </form>
        
        <div className="auth-footer">
          <p>Jau ir konts? <Link to="/login">Ielogoties</Link></p>
        </div>
      </div>
    </div>
  );
}
