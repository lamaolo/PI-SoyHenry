/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { useEffect } from 'react';

import Search from '../../components/Search';
import Filters from '../../components/Filters';
import Countries from '../../components/Countries';

import { fetchCountries } from '../../actions';

import './styles.css';

const Home = ({ error, fetchCountries, loading }) => {
  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <Search />
        <Filters />
      </header>
      <main>
        {loading ? (
          <div className="loading-css"></div>
        ) : error ? (
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
            <h2>
              <b>WHAAT? </b>
              {error}
            </h2>
          </div>
        ) : (
          <Countries />
        )}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.error,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { fetchCountries })(Home);
