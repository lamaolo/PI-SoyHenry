import { useState } from 'react';
import { connect } from 'react-redux';

import FilterContinent from '../FilterContinent';
import FilterPopulation from '../FilterPopulation';
import { filterByContinent, filterByPopulation } from '../../actions';

import './styles.css';

const Filters = ({ filterByContinent, filterByPopulation }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [continentFilter, setContinentFilter] = useState('Todos');
  const [populationFilter, setPopulationFilter] = useState('Ninguno');

  const handleApplyFilters = (e) => {
    setIsFilterVisible(false);

    filterByPopulation(populationFilter);
    filterByContinent(continentFilter);
  };

  return (
    <button
      className="Filters unstyled-btn"
      onClick={() => setIsFilterVisible(!isFilterVisible)}
    >
      Filtros
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${isFilterVisible ? 'rotate' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <div className={`Filters-box ${isFilterVisible && 'visible'}`}>
        <div className="Filters-box-filters">
          <FilterPopulation
            populationFilter={populationFilter}
            setPopulationFilter={setPopulationFilter}
          />
          <FilterContinent
            continentFilter={continentFilter}
            setContinentFilter={setContinentFilter}
          />
        </div>
        <div
          onClick={handleApplyFilters}
          className="main-btn Filters-apply-button"
        >
          Aplicar
        </div>
      </div>
    </button>
  );
};

export default connect(null, { filterByContinent, filterByPopulation })(
  Filters
);
