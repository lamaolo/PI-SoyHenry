import axios from 'axios';

const BASE_API = 'http://localhost:3001/api';

export const filterName = (payload) => {
  // return {
  //   type: 'FILTER_COUNTRIES_BY_NAME',
  //   payload,
  // };
  return (dispatch) => {
    axios(`${BASE_API}/countries?name=${payload}`)
      .then(({ data: { data } }) => {
        dispatch({ type: 'FILTER_COUNTRIES_BY_NAME', payload: data });
      })
      .catch(() => dispatch({ type: '404_COUNTRIES_NAME', payload: payload }));
  };
};

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
