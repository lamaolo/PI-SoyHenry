/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import Search from '../../components/Search';
import Filters from '../../components/Filters';
import Countries from '../../components/Countries';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchCountries, fetchActivities } from '../../actions';

import './styles.css';

const Home = ({ fetchCountries, fetchActivities }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCountries(setIsLoading);
    fetchActivities();
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <Search />
        <Filters />
      </header>
      <main className="Home-main">
        {isLoading ? <LoadingSpinner /> : <Countries />}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps, { fetchCountries, fetchActivities})(
  Home
);
