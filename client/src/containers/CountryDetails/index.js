/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { connect } from "react-redux";
import { setCountryDetail } from "../../actions";
import { Link } from "react-router-dom";

import "./styles.css";

const CountryDetails = ({ match, setCountryDetail, countryDetail, error }) => {
  useEffect(() => {
    setCountryDetail(match.params.id);

    return () => setCountryDetail(null);
  }, []);

  return (
    <div className="CountryDetails">
      {error ? (
        <div className="Home-countries-error">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2>
            <b>WHAAT? </b>
            {error}
          </h2>
        </div>
      ) : (
        <div className="CountryDetails-container">
          <Link className="goback unstyled-link" to="/home">
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
          </Link>

          <div className="CountryDetails-country">
            <div className="country-flag">
              <img src={countryDetail.image} alt={countryDetail.name} />
            </div>
            <div className="country-details">
              <header className="country-details-header">
                <h1>{countryDetail?.name}</h1>
                <h2>{countryDetail?.continent}.</h2>
              </header>
              <section className="country-details-body">
                <div className="country-details-body-item">
                  <b>Código de pais: </b>
                  <p>{countryDetail.id}.</p>
                </div>
                <div className="country-details-body-item">
                  <b>Capital: </b>
                  <p>{countryDetail.capital}.</p>
                </div>
                <div className="country-details-body-item">
                  <b>Subregion: </b>
                  <p>{countryDetail.subregion}.</p>
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
              </section>
            </div>
          </div>
        </div>
      )}
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
