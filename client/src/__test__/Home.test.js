/* eslint-disable jest/valid-describe */
import React from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';

import CountryDetails from '../containers/CountryDetails';
import store from '../store';

// describe('<CountryDetails />', () => {
//   const history = createMemoryHistory();

//   it('Deberia renderizar el pais que tiene como ID el paremtro ID de la URL.', async () => {
//     history.push('/country/arg');
//     let { findByText } = render(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={['/country/arg']}>
//           <CountryDetails match={{ params: { id: 'arg' } }} />
//         </MemoryRouter>
//       </Provider>
//     );

//     expect(await findByText('Argentina')).toBeInTheDocument();
//   });
// });

describe('<CountryDetails />', () => {
  it('Deberia renderizar Argentina cuando le pasamos por query params el ID de ese pais', async () => {
    let wrapper = renderWithRouterMatch(CountryDetails, {
      route: '/country/arg',
      path: '/country/:id',
    });
    expect(await wrapper.findByText('Argentina')).toBeInTheDocument();
    expect(await wrapper.findByText('Americas.')).toBeInTheDocument();
    expect(await wrapper.findByText('Buenos Aires.')).toBeInTheDocument();
    expect(await wrapper.findByText('South America.')).toBeInTheDocument();

    // Renderiza la imagen correcta de la bandera
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('arg.svg');
  });

  it('Deberia renderizar España cuando le pasamos por query params el ID de ese pais', async () => {
    let wrapper = renderWithRouterMatch(CountryDetails, {
      route: '/country/esp',
      path: '/country/:id',
    });
    expect(await wrapper.findByText('Spain')).toBeInTheDocument();
    expect(await wrapper.findByText('Europe.')).toBeInTheDocument();
    expect(await wrapper.findByText('Madrid.')).toBeInTheDocument();
    expect(await wrapper.findByText('Southern Europe.')).toBeInTheDocument();

    // Renderiza la imagen correcta de la bandera
    const displayedImage = document.querySelector('img');
    expect(displayedImage.src).toContain('esp.svg');
  });

  it('Deberia renderizar un botón para volver al Home sin recargar la página', () => {
    let wrapper = renderWithRouterMatch(CountryDetails, {
      route: '/country/jpn',
      path: '/country/:id',
    });

    const button = document.querySelector('a.goback');

    expect(button).toBeTruthy();
    expect(button.href).toContain('/home');
  });
});

export function renderWithRouterMatch(ui, { path, route }) {
  const history = createMemoryHistory({ initialEntries: [route] });

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Route path={path} component={ui} />
      </Router>
    </Provider>
  );
}
