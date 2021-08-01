/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CountryCard from '../CountryCard';
import { setError } from '../../actions';

import './styles.css';

const Countries = ({ countries, filter, setError }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);

  useEffect(() => {
    let countiresToFilter = countries;

    if (filter.continent) {
      countiresToFilter = countiresToFilter.filter(
        (c) => c.continent === filter.continent
      );
    }

    console.log(countiresToFilter);

    if (filter.order) {
      if (filter.order === 'asc') {
        countiresToFilter = countiresToFilter.sort((a, b) =>
          a.population < b.population ? 1 : -1
        );
      } else if (filter.order === 'desc') {
        countiresToFilter = countiresToFilter.sort((a, b) =>
          a.population > b.population ? 1 : -1
        );
      }
    }

    if (!countiresToFilter.length && countries.length) {
      setError('No se ha encontrado ningun pais con los filtros aplicados');
    } else {
      setFilteredCountries(countiresToFilter);
    }
  }, [filter.order, filter.continent, countries]);

  return (
    <>
      <div className="Countries-filters">
        <h1 className="Countries-continent">
          {filter.continent || 'Todos los paises'}
        </h1>
        {filter.order && (
          <div className="Countries-active-filters">
            <p>Filtrando</p>
            {filter.order && (
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
            {filter.order ? (
              filter.order === 'asc' ? (
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
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )
            ) : (
              ''
            )}
          </div>
        )}
      </div>
      <div className="Home-countries">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.id}
            id={country.id}
            image={country.image}
            continent={country.continent}
            name={country.name}
          />
        ))}
      </div>
    </>
  );

  if (filter.continent) {
    return (
      <>
        <h1 className="Countries-continent">{filter.continent}</h1>
        <div className="Home-countries">
          {countries.filter((c) => c.continent === filter.continent).length ? (
            countries
              .filter((c) => c.continent === filter.continent)
              .map((country) => (
                <CountryCard
                  key={country.id}
                  id={country.id}
                  image={country.image}
                  continent={country.continent}
                  name={country.name}
                />
              ))
          ) : (
            <h2 className="Countries-error">
              El pais ingresado no se encuentra en el continente{' '}
              {filter.continent}.
            </h2>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="Countries-continent">Todos los paises</h1>
        <div className="Home-countries">
          {countries.map((country) => (
            <CountryCard
              key={country.id}
              id={country.id}
              image={country.image}
              continent={country.continent}
              name={country.name}
            />
          ))}
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { setError })(Countries);
