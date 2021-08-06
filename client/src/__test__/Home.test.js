import React from 'react';
// import { configure, mount } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers';

import Home from '../containers/Home';
import Countries from '../components/Countries';
import CountryCard from '../components/CountryCard';
import { render } from '@testing-library/react';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router';

// configure({ adapter: new Adapter() });

let store;
describe('<Home />', () => {
  beforeEach(() => {
    store = createTestStore();
  });

  it('Should render the search input', () => {
    let wrapper = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(
      wrapper.getByPlaceholderText('Busca un pais...')
    ).toBeInTheDocument();
  });
});

function createTestStore() {
  const store = createStore(
    reducer,
    mockState,
    compose(applyMiddleware(thunk))
  );
  return store;
}

const mockState = {
  countries: [
    {
      id: 'AFG',
      name: 'Afghanistan',
      image: 'https://restcountries.eu/data/afg.svg',
      continent: 'Asia',
      capital: 'Kabul',
      subregion: 'Southern Asia',
      area: 652230,
      population: 27657145,
    },
    {
      id: 'ALA',
      name: 'Åland Islands',
      image: 'https://restcountries.eu/data/ala.svg',
      continent: 'Europe',
      capital: 'Mariehamn',
      subregion: 'Northern Europe',
      area: 1580,
      population: 28875,
    },
    {
      id: 'ALB',
      name: 'Albania',
      image: 'https://restcountries.eu/data/alb.svg',
      continent: 'Europe',
      capital: 'Tirana',
      subregion: 'Southern Europe',
      area: 28748,
      population: 2886026,
    },
    {
      id: 'DZA',
      name: 'Algeria',
      image: 'https://restcountries.eu/data/dza.svg',
      continent: 'Africa',
      capital: 'Algiers',
      subregion: 'Northern Africa',
      area: 2381741,
      population: 40400000,
    },
    {
      id: 'ASM',
      name: 'American Samoa',
      image: 'https://restcountries.eu/data/asm.svg',
      continent: 'Oceania',
      capital: 'Pago Pago',
      subregion: 'Polynesia',
      area: 199,
      population: 57100,
    },
    {
      id: 'AND',
      name: 'Andorra',
      image: 'https://restcountries.eu/data/and.svg',
      continent: 'Europe',
      capital: 'Andorra la Vella',
      subregion: 'Southern Europe',
      area: 468,
      population: 78014,
    },
    {
      id: 'AGO',
      name: 'Angola',
      image: 'https://restcountries.eu/data/ago.svg',
      continent: 'Africa',
      capital: 'Luanda',
      subregion: 'Middle Africa',
      area: 1246700,
      population: 25868000,
    },
    {
      id: 'AIA',
      name: 'Anguilla',
      image: 'https://restcountries.eu/data/aia.svg',
      continent: 'Americas',
      capital: 'The Valley',
      subregion: 'Caribbean',
      area: 91,
      population: 13452,
    },
    {
      id: 'ATA',
      name: 'Antarctica',
      image: 'https://restcountries.eu/data/ata.svg',
      continent: 'Polar',
      capital: '',
      subregion: '',
      area: 14000000,
      population: 1000,
    },
  ],
  countryDetail: {},
  activities: [],
  filter: {
    continent: 'Todos',
    order: 'Desc',
    filter: 'Alfabéticamente',
    activity: 'Todas',
  },
  error: '',
  loading: true,
};

// container = shallow(<Countries />);
// expect(container.find(CountryCard)).toHaveLength(9);
