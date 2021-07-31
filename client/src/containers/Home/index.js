/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../actions';
import { CountryCard } from '../../components/CountryCard';
import Search from '../../components/Search';

import './styles.css';

const Home = ({ fetchProducts, countries, error }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <Search />
      </header>
      <main className="Home-countries">
        {error ? (
          <div className="Home-countries-error">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2>{error}</h2>
          </div>
        ) : (
          countries
            .slice(0, 9)
            .map(({ id, image, continent, name }) => (
              <CountryCard
                key={id}
                id={id}
                image={image}
                continent={continent}
                name={name}
              />
            ))
        )}
      </main>
    </div>
  );
};

const mapDispatchToProps = {
  fetchProducts,
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    error: state.error,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
