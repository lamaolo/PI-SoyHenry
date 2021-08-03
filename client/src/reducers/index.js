const initialState = {
  countries: [],
  countryDetail: {},
  filter: {
    continent: "Todos",
    order: "Desc",
    filter: "Alfabéticamente",
  },
  error: "",
  loading: true,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COUNTRIES": {
      return {
        ...state,
        countries: action.payload,
        error: "",
        loading: false,
      };
    }
    case "FILTER_COUNTRIES_BY_NAME": {
      return {
        ...state,
        countries: action.payload,
        error: "",
      };
    }
    case "SET_FILTERS": {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "FILTER_COUNTRIES_BY_CONTINENT": {
      return {
        ...state,
        filter: {
          ...state.filter,
          continent: action.payload === "Todos" ? false : action.payload,
        },
        error: "",
      };
    }
    case "SET_COUNTRY_DETAIL": {
      return {
        ...state,
        countryDetail: action.payload,
      };
    }
    case "REMOVE_COUNTRY_DETAIL": {
      return {
        ...state,
        countryDetail: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
