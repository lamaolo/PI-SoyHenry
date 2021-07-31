const initialState = {
  countries: [],
  countryDetail: {},
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COUNTRIES': {
      return {
        ...state,
        countries: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
