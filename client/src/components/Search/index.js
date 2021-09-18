import { useState } from 'react';
import { connect } from 'react-redux';
import { filterName, setLoading } from '../../actions';

import './styles.css';

const Search = ({ filterName, setLoading }) => {
  const [value, setValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    filterName(value);
  };

  return (
    <form className="Search-form" onSubmit={handleSearch}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="country"
        placeholder="Busca un pais..."
        autoComplete="off"
      />
      <button className="unstyled-btn" type="submit">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};
export default connect(null, { filterName, setLoading })(Search);
