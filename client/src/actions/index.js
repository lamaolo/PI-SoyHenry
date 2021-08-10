import axios from 'axios';

const BASE_API = 'http://localhost:3001/api';

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
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

export const updateActivity = (payload, id, refresh) => {
  return (dispatch) => {
    axios
      .patch(`${BASE_API}/activities/${id}`, payload)
      .then(() => {
        refresh();
      })
      .catch((error) => dispatch(setError(error.message)));
  };
};

export const removeActivityDetail = () => ({
  type: 'REMOVE_ACTIVITY_DETAIL',
});

export const fetchActivity = (payload) => {
  return (dispatch) => {
    axios(`${BASE_API}/activities/${payload}`)
      .then(({ data: { data } }) => {
        dispatch(setLoading(false));
        dispatch({ type: 'SET_ACITIVTY', payload: data });
      })
      .catch(() => {
        dispatch(
          setError('No se encontró ninguna actividad con el ID especificado.')
        );
      });
  };
};

export const fetchActivities = (setIsLoading) => {
  return (dispatch) => {
    axios(`${BASE_API}/activities`)
      .then(({ data: { data } }) => {
        setIsLoading && setIsLoading(false);

        dispatch({ type: 'FETCH_ACTIVITIES', payload: data });
      })
      .catch((error) => {
        console.error('ERROR: ', error);
        dispatch(setError('Ha ocurrido un error inesperado.'));
      });
  };
};

export const createActivity = (
  payload,
  setIsButtonDisabled,
  setSuccessMessage
) => {
  return (dispatch) => {
    axios
      .post(`${BASE_API}/activities`, payload)
      .then(() => {
        setIsButtonDisabled(false);
        dispatch(setError(''));
        setSuccessMessage('Actividad creada correctamente');
      })
      .catch((error) => {
        dispatch(setError(error.response.data.error || 'Error interno'));
        setIsButtonDisabled(false);
      });
  };
};

export const setCountryDetail = (payload) => {
  if (!payload) {
    return {
      type: 'REMOVE_COUNTRY_DETAIL',
    };
  }

  return (dispatch) => {
    axios(`${BASE_API}/countries/${payload}`)
      .then(({ data: { data } }) => {
        dispatch({
          type: 'SET_COUNTRY_DETAIL',
          payload: data,
        });
      })
      .catch((error) => {
        console.error('ERROR: ', error);
        dispatch(setError('No se ha encontrado pais con el nombre ingresado.'));
      });
  };
};

export const setFilteredCountries = (payload) => ({
  type: 'SET_FILTERED_COUNTIRES',
  payload,
});

export const setFilters = (payload) => ({
  type: 'SET_FILTERS',
  payload,
});

export const fetchCountries = () => {
  return (dispatch) => {
    axios(`${BASE_API}/countries`)
      .then(({ data: { data } }) =>
        dispatch({ type: 'SET_COUNTRIES', payload: data })
      )
      .catch((error) => {
        console.log(error);
        dispatch(
          setError(
            'Ha ocurrido un error inesperado mientras se cargaban los paises.'
          )
        );
      });
  };
};
