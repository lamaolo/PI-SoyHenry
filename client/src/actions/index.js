import axios from 'axios';

export const fetchProducts = () => {
  return (dispatch) => {
    axios('http://localhost:3001/api/countries')
      .then(({ data: { data } }) =>
        dispatch({ type: 'SET_COUNTRIES', payload: data })
      )
      .catch((error) => console.log(error));
  };
};
