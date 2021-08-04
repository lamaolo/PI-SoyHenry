/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchCountries, createActivity, setError } from '../../actions';

import './styles.css';

const CreateActivity = ({
  countries,
  fetchCountries,
  createActivity,
  setError,
  error,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [values, setValues] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: 'Verano',
    countries: [],
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    if (!values.countries.length) {
      setIsButtonDisabled(false);
      return setError('Debes seleccionar al menos un pais.');
    }

    createActivity(values, setIsButtonDisabled);

    if (!error) {
      setSuccessMessage('Actividad creada correctamente');
    }

    setValues({
      name: '',
      difficulty: '',
      duration: '',
      season: 'Verano',
      countries: [],
    });
  };

  const handleChange = (e) => {
    setSuccessMessage('');
    if (e.target.name === 'difficulty') {
      if (e.target.value > 5) {
        e.target.value = 5;
      } else if (e.target.value < 1) {
        e.target.value = '';
      }
    }

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCountries = (event) => {
    if (!event.nativeEvent.inputType) {
      setError('');
      if (!values.countries.find((c) => c === event.target.value)) {
        setValues({
          ...values,
          countries: [...values.countries, event.target.value],
        });
      }
      event.target.value = '';
    }
  };

  const handleRemoveCountry = (id) => {
    setValues({
      ...values,
      countries: values.countries.filter((c) => c !== id),
    });
  };

  const clear = (e) => {
    e.target.value = '';
  };

  return (
    <div className="CreateActivity">
      <header className="CreateActivity-header">
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
        <h1>Crear actividad</h1>
      </header>
      <form onSubmit={handleSubmit} className="CreateActivity-body">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            placeholder="Escribe el nombre de la actividad..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Dificultad (1 - 5)</label>
          <input
            type="number"
            value={values.difficulty}
            onChange={handleChange}
            max={5}
            name="difficulty"
            min={1}
            id="difficulty"
            required
            autoComplete="off"
            placeholder="Escribe el nivel de dificultad..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duración (minutos)</label>
          <input
            value={values.duration}
            onChange={handleChange}
            type="number"
            name="duration"
            id="duration"
            required
            autoComplete="off"
            placeholder="Escribe la duracion..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="season">Temporada</label>
          <select
            value={values.season}
            onChange={handleChange}
            name="season"
            id="season"
            required
          >
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="countries">Paises</label>
          <input
            onChange={handleAddCountries}
            name="countries"
            multiple
            list="countries"
            onClick={clear}
            onFocus={clear}
          />
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </datalist>
        </div>
        <div className="Countries-to-add">
          {countries
            .filter((c) => values.countries.includes(c.id))
            .map((country) => (
              <p key={country.name} className="country-to-add">
                <button
                  onClick={() => handleRemoveCountry(country.id)}
                  className="unstyled-btn"
                >
                  X
                </button>
                {country.name}
              </p>
            ))}
        </div>
        <div className="form-group">
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="main-btn"
          >
            Crear actividad
          </button>
        </div>
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
            <h2>{error}</h2>
          </div>
        ) : (
          successMessage && (
            <div className="success-message">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="success-message">{successMessage}</p>
            </div>
          )
        )}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  fetchCountries,
  createActivity,
  setError,
})(CreateActivity);
