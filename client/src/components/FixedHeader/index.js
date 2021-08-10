import { Link } from 'react-router-dom';

import './styles.css';

const FixedHeader = () => {
  return (
    <header className="FixedHeader-container">
      <div className="FixedHeader">
        <Link className="Fixed-header-title unstyled-link" to="/home">
          PI Countries
        </Link>
        <div className="FixedHeader-links">
          <Link to="/home">Home</Link>
          <Link to="/activities">Actividades</Link>
        </div>
      </div>
    </header>
  );
};

export default FixedHeader;
