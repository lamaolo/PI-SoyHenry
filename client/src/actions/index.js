import axios from 'axios';

const BASE_API = 'http://localhost:3001/api';

export const filterName = (payload) => {
  return (dispatch) => {
    axios(`${BASE_API}/countries?name=${payload}`)
      .then(({ data: { data } }) => {
        dispatch({ type: 'FILTER_COUNTRIES_BY_NAME', payload: data });
      })
      .catch(() => dispatch({ type: '404_COUNTRIES_NAME', payload: payload }));
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    axios(`${BASE_API}/countries`)
      .then(({ data: { data } }) =>
        dispatch({ type: 'SET_COUNTRIES', payload: data })
      )
      .catch((error) => console.log(error));
  };
};
