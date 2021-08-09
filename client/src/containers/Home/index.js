/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { useEffect } from 'react';

import Search from '../../components/Search';
import Filters from '../../components/Filters';
import Countries from '../../components/Countries';

import { fetchCountries, fetchActivities } from '../../actions';

import './styles.css';
import FixedHeader from '../../components/FixedHeader';

const Home = ({ fetchCountries, fetchActivities, loading }) => {
  useEffect(() => {
    fetchCountries();
    fetchActivities();
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <Search />
        <Filters />
      </header>
      <main>
        {loading ? <div className="loading-css"></div> : <Countries />}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps, { fetchCountries, fetchActivities })(
  Home
);
