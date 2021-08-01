import axios from 'axios';

const BASE_API = 'http://localhost:3001/api';

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const filterName = (payload) => {
  return (dispatch) => {
    axios(`${BASE_API}/countries?name=${payload}`)
      .then(({ data: { data } }) => {
        dispatch({ type: 'FILTER_COUNTRIES_BY_NAME', payload: data });
      })
      .catch(() =>
        dispatch(
          setError(`No se encontró ningún pais con el nombre "${payload}"`)
        )
      );
  };
};

export const filterByPopulation = (payload) => ({
  type: 'FILTER_COUNTRIES_BY_POPULATION',
  payload,
});

export const filterByContinent = (payload) => ({
  type: 'FILTER_COUNTRIES_BY_CONTINENT',
  payload,
});

export const fetchCountries = () => {
  return (dispatch) => {
    axios(`${BASE_API}/countries`)
      .then(({ data: { data } }) =>
        dispatch({ type: 'SET_COUNTRIES', payload: data })
      )
      .catch((error) => console.log(error));
  };
};
