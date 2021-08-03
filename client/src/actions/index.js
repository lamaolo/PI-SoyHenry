import axios from "axios";

const BASE_API = "http://localhost:3001/api";

export const setError = (payload) => ({
  type: "SET_ERROR",
  payload,
});

export const filterName = (payload) => {
  return (dispatch) => {
    axios(`${BASE_API}/countries?name=${payload}`)
      .then(({ data: { data } }) => {
        dispatch({ type: "FILTER_COUNTRIES_BY_NAME", payload: data });
      })
      .catch(() =>
        dispatch(
          setError(`No se encontró ningún pais con el nombre "${payload}"`)
        )
      );
  };
};

export const setCountryDetail = (payload) => {
  if (!payload) {
    return {
      type: "REMOVE_COUNTRY_DETAIL",
    };
  }

  return (dispatch) => {
    axios(`${BASE_API}/countries/${payload}`)
      .then(({ data: { data } }) => {
        dispatch({
          type: "SET_COUNTRY_DETAIL",
          payload: data,
        });
      })
      .catch((error) => {
        console.error("ERROR: ", error);
        dispatch(setError("No se ha encontrado pais con el nombre ingresado."));
      });
  };
};

export const setFilteredCountries = (payload) => ({
  type: "SET_FILTERED_COUNTIRES",
  payload,
});

export const setFilters = (payload) => ({
  type: "SET_FILTERS",
  payload,
});

export const fetchCountries = () => {
  return (dispatch) => {
    axios(`${BASE_API}/countries`)
      .then(({ data: { data } }) =>
        dispatch({ type: "SET_COUNTRIES", payload: data })
      )
      .catch((error) => console.log(error));
  };
};
