/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Filter from '../Filter';
import { setFilters } from '../../actions';

import './styles.css';

const Filters = ({ setFilters }) => {
  const [isContinentVisible, setIsContinentVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isOrderVisible, setIsOrderVisible] = useState(false);

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

  useEffect(() => {
    setFilters({ continent, order, filter });
  }, [continent, order, filter]);

  return (
    <div className="Filters-container">
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

export default connect(null, {
  setFilters,
})(Filters);
