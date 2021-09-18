const initialState = {
  countries: [],
  countryDetail: {},
  activities: [],
  filter: {
    continent: 'Todos',
    order: 'Desc',
    filter: 'Alfabéticamente',
    activity: 'Todas',
  },
  activityDetail: {},
  error: '',
  loading: true,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COUNTRIES': {
      return {
        ...state,
        countries: action.payload,
        error: '',
        loading: false,
      };
    }
    case 'FETCH_ACTIVITIES': {
      return {
        ...state,
        activities: action.payload,
      };
    }
    case 'SET_ACITIVTY': {
      return {
        ...state,
        activityDetail: action.payload,
      };
    }
    case 'FILTER_COUNTRIES_BY_NAME': {
      return {
        ...state,
        countries: action.payload,
        loading: false,
        error: '',
      };
    }
    case 'SET_FILTERS': {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'SET_COUNTRY_DETAIL': {
      return {
        ...state,
        countryDetail: action.payload,
      };
    }
    case 'REMOVE_COUNTRY_DETAIL': {
      return {
        ...state,
        countryDetail: {},
      };
    }
    case 'REMOVE_ACTIVITY_DETAIL': {
      return {
        ...state,
        activityDetail: {},
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducers;
