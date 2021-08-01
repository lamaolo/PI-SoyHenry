const initialState = {
  countries: [],
  countryDetail: {},
  filteredCountries: [],
  filter: {
    continent: null,
    order: null,
  },
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
    case 'FILTER_COUNTRIES_BY_POPULATION': {
      if (action.payload === 'Descendiente') {
        return {
          ...state,
          filter: {
            ...state.filter,
            order: 'desc',
          },
          error: null,
        };
      } else if (action.payload === 'Ascendiente') {
        return {
          ...state,
          filter: {
            ...state.filter,
            order: 'asc',
          },
          error: null,
        };
      }

      return {
        ...state,
        filter: {
          ...state.filter,
          order: null,
        },
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'FILTER_COUNTRIES_BY_CONTINENT': {
      return {
        ...state,
        filter: {
          ...state.filter,
          continent: action.payload === 'Todos' ? false : action.payload,
        },
        error: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
