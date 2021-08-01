const initialState = {
  countries: [],
  countryDetail: {},
  filteredCountries: [],
  filter: {
    continent: [],
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
      if (state.filter.continent.length) {
        const filteredCountries = action.payload.filter((country) =>
          state.filter.continent.includes(country.continent)
        );

        if (filteredCountries.length) {
          return {
            ...state,
            filteredCountries: action.payload.filter((country) =>
              state.filter.continent.includes(country.continent)
            ),
            error: '',
          };
        } else {
          return {
            ...state,
            filteredCountries: [],
            error: `No se encontró ningun pais con el nombre ingresado en los continentes ${state.filter.continent.join(
              ', '
            )}.`,
          };
        }
      } else {
        return {
          ...state,
          filteredCountries: action.payload,
          error: '',
        };
      }
    }
    case '404_COUNTRIES_NAME': {
      return {
        ...state,
        error: `No se ha encontrado ningun pais con el nombre "${action.payload}".`,
      };
    }
    case 'FILTER_COUNTRIES_BY_CONTINENT': {
      return {
        ...state,
        filteredCountries: state.countries.filter((country) =>
          action.payload.includes(country.continent)
        ),
        filter: {
          ...state.filter,
          continent: action.payload,
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
