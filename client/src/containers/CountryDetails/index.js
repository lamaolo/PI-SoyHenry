/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import Error from '../../components/Error';
import { setCountryDetail } from '../../actions';

import './styles.css';

const CountryDetails = (
  { match, setCountryDetail, countryDetail, error },
  props
) => {
  const history = useHistory();

  useEffect(() => {
    setCountryDetail(match.params.id);
    console.log(props.history);

    return () => setCountryDetail(null);
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="CountryDetails">
      <div className="CountryDetails-container">
        <button onClick={goBack} className="goback unstyled-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>
        {error ? (
          <Error />
        ) : (
          <div className="CountryDetails-country">
            <div className="country-flag">
              <img src={countryDetail.image} alt={countryDetail.name} />
            </div>
            <div className="country-details">
              <header className="country-details-header">
                <h1>{countryDetail?.name}</h1>
                <h2>{countryDetail.continent || 'Sin continente'}.</h2>
              </header>
              <section className="country-details-body">
                <div className="country-details-body-item">
                  <b>Código de pais: </b>
                  <p>{countryDetail.id}.</p>
                </div>
                <div className="country-details-body-item">
                  <b>Capital: </b>
                  <p>{countryDetail.capital || 'Sin capital'}.</p>
                </div>
                <div className="country-details-body-item">
                  <b>Subregion: </b>
                  <p>{countryDetail.subregion || 'Sin subregion'}.</p>
                </div>
                <div className="country-details-body-item">
                  <b>Área: </b>
                  <p>
                    {countryDetail.area} km<sup>2</sup>.
                  </p>
                </div>
                <div className="country-details-body-item">
                  <b>Población: </b>
                  <p>{countryDetail.population}.</p>
                </div>
                {countryDetail.activities?.length ? (
                  <div className="country-details-body-item activities">
                    <b>Actividades disponibles: </b>
                    <ul>
                      {countryDetail.activities.map((activity) => (
                        <li key={activity.id}>
                          <Link
                            to={`/activity/${activity.id}`}
                            className="unstyled-link"
                          >
                            {activity.name}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countryDetail: state.countryDetail,
    error: state.error,
  };
};

export default connect(mapStateToProps, { setCountryDetail })(CountryDetails);
