import { Link } from 'react-router';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Organizējiet savus uzdevumus
            <span className="gradient-text"> vienkārši un efektīvi</span>
          </h1>
          <p className="hero-description">
            Moderna to-do list aplikācija, kas palīdz jums sekot līdzi visiem uzdevumiem, 
            organizēt tos pa kategorijām un sasniegt savus mērķus.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary btn-large">
              Sākt bez maksas
            </Link>
            <Link to="/login" className="btn-secondary btn-large">
              Jau ir konts?
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">
            <div className="illustration-card card-1">Pabeigts</div>
            <div className="illustration-card card-2">Darāms</div>
            <div className="illustration-card card-3">Svarīgi</div>
          </div>
        </div>
      </div>
    </section>
  );
}
