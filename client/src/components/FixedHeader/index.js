import { Link } from 'react-router-dom';

import './styles.css';

const FixedHeader = () => {
  return (
    <header className="FixedHeader-container">
      <div className="FixedHeader">
        <Link className="unstyled-link" to="/home">
          PI Countries
        </Link>
      </div>
    </header>
  );
};

export default FixedHeader;
