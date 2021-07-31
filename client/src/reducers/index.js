const initialState = {
  countries: [],
  countryDetail: {},
  error: '',
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COUNTRIES': {
      return {
        ...state,
        countries: action.payload,
        error: '',
      };
    }
    case 'FILTER_COUNTRIES_BY_NAME': {
      return {
        ...state,
        countries: action.payload,
        error: '',
      };
    }
    case '404_COUNTRIES_NAME': {
      return {
        ...state,
        error: `No se ha encontrado ningun pais con el nombre "${action.payload}".`,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
