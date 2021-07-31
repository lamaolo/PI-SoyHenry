import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../static/img/countries.png';

export const LandingPage = () => {
  return (
    <div className="container">
      <main className="LandingPage">
        <header className="LandingPage-header">
          <h1>PI Countries</h1>
          <img src={logo} alt="Countries" />
        </header>
        <Link to="/home" style={{ textDecoration: 'none' }}>
          <button className="main-btn LandingPage-button">
            <strong>Ingresar</strong>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </main>
    </div>
  );
};
