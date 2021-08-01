import { useState } from 'react';
import { connect } from 'react-redux';

import FilterContinent from '../FilterContinent';
import FilterPopulation from '../FilterPopulation';
import { filterByContinent, filterByPopulation } from '../../actions';

import './styles.css';

const Filters = ({ filterByContinent, filterByPopulation }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedContinents, setSelectedContinents] = useState();
  const [populationFilter, setPopulationFilter] = useState('Ninguno');

  const handleCheckboxClick = (e) => {
    setSelectedContinents({
      ...selectedContinents,
      [e.target.name]: e.target.checked,
    });
  };

  const handleApplyFilters = (e) => {
    setIsFilterVisible(false);
    const filters = [];

    for (const key in selectedContinents) {
      if (selectedContinents[key]) filters.push(key);
    }

    if (populationFilter !== 'Ninguno') {
      filterByPopulation(populationFilter);
    }

    filterByContinent(filters);
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
            selectedContinents={selectedContinents}
            handleCheckboxClick={handleCheckboxClick}
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
