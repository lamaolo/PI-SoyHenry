/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CountryCard from '../CountryCard';
import { setError } from '../../actions';

import './styles.css';

const Countries = ({ countries, filter, setError }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([0, 9]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    let toFilter = [];

    filter.continent !== 'Todos'
      ? (toFilter = countries.filter((c) => c.continent === filter.continent))
      : (toFilter = countries);

    if (filter.filter === 'Población') {
      if (filter.order === 'Asc') {
        toFilter = [...toFilter].sort((a, b) =>
          a.population > b.population ? 1 : -1
        );
      } else {
        toFilter = [...toFilter].sort((a, b) =>
          a.population < b.population ? 1 : -1
        );
      }
    } else if (filter.filter === 'Alfabéticamente') {
      if (filter.order === 'Asc') {
        toFilter = [...toFilter].sort((a, b) => b.name.localeCompare(a.name));
      } else {
        toFilter = [...toFilter].sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    if (!toFilter.length) {
      setError('No se ha encontrado ningún pais con los filtros establecidos.');
    }

    setFilteredCountries(toFilter);
    setCountriesToShow([0, 9]);
  }, [filter, countries]);

  const handleChangePange = (e) => {
    setCountriesToShow(() => [
      (e.target.dataset.value - 1) * 9,
      e.target.dataset.value * 9,
    ]);
  };

  return (
    <>
      <div className="Countries-filters">
        <h1 className="Countries-continent">
          {filter.continent || 'Todos los paises'}
        </h1>
        <Link className="unstyled-link" to="/create/activity">
          <button className="Countries-createactivity main-btn">
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
                d="M12 4v16m8-8H4"
              />
            </svg>{' '}
            Crear actividad
          </button>
        </Link>
      </div>
      <div className="Home-countries">
        {filteredCountries
          .slice(countriesToShow[0], countriesToShow[1])
          .map((country) => (
            <CountryCard
              key={country.id}
              id={country.id}
              image={country.image}
              continent={country.continent}
              name={country.name}
            />
          ))}
      </div>
      <div className="Page-buttons">
        {Array(Math.ceil(filteredCountries.length / 9))
          .fill(1)
          .map((_, i) => (
            <button
              onClick={handleChangePange}
              data-value={i + 1}
              key={i}
              className={`main-btn filter-btn ${
                countriesToShow[0] === i * 9 && 'active'
              }`}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { setError })(Countries);
