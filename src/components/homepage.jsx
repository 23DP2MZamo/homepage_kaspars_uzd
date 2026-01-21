import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from './Header';
import Hero from './Hero';
import Cards from './Cards';
import Footer from './Footer';
import './Homepage.css';

export default function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
    // Если не авторизован - остаемся на homepage
  }, [navigate]);

  return (
    <div className="homepage">
      <Header />
      <main>
        <Hero />
        <Cards />
      </main>
      <Footer />
    </div>
  );
}
