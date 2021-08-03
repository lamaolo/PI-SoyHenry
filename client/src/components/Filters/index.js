/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Filter from '../Filter';
import { setFilters } from '../../actions';

import './styles.css';

const Filters = ({ activities, setFilters }) => {
  const [isActivitiesVisible, setIsActivitiesVisible] = useState(false);
  const [isContinentVisible, setIsContinentVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);

  const [activity, setActivity] = useState('Todas');
  const [continent, setContinent] = useState('Todos');
  const [filter, setFilter] = useState('Alfabéticamente');
  const [order, setOrder] = useState('Desc');

  const handleFilter = (e) => {
    setIsFilterVisible(false);
    setFilter(e.target.dataset.value);
  };

  const handleOrder = (e) => {
    setIsOrderVisible(false);
    setOrder(e.target.dataset.value);
  };

  const handleContinent = (e) => {
    setIsContinentVisible(false);
    setContinent(e.target.dataset.value);
  };

  const handleActivity = (e) => {
    setIsActivitiesVisible(false);
    setActivity(e.target.dataset.value);
  };

  useEffect(() => {
    setFilters({ continent, order, filter, activity });
  }, [continent, order, filter, activity]);

  return (
    <div className="Filters-container">
      <Filter
        isVisible={isActivitiesVisible}
        setIsVisible={setIsActivitiesVisible}
        name={activity}
        handler={handleActivity}
        values={['Todas', ...activities.map(({ name }) => name)]}
      />
      <Filter
        isVisible={isContinentVisible}
        setIsVisible={setIsContinentVisible}
        name={continent}
        handler={handleContinent}
        values={['Todos', 'Americas', 'Europe', 'Asia', 'Oceania', 'Polar']}
      />
      <Filter
        isVisible={isFilterVisible}
        setIsVisible={setIsFilterVisible}
        name={filter}
        handler={handleFilter}
        values={['Alfabéticamente', 'Población']}
      />
      <Filter
        isVisible={isOrderVisible}
        setIsVisible={setIsOrderVisible}
        name={order}
        handler={handleOrder}
        values={['Asc', 'Desc']}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  activities: state.activities,
});

export default connect(mapStateToProps, {
  setFilters,
})(Filters);
