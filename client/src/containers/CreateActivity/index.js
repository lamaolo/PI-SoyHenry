/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Error from '../../components/Error';
import FormGroup from '../../components/FormGroup';
import Dropdown from '../../components/Dropdown';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  useEffect(() => {
    if (successMessage) {
      setValues({
        name: '',
        difficulty: '',
        duration: '',
        season: 'Verano',
        countries: [],
      });
    }
  }, [successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    if (!values.countries.length) {
      setIsButtonDisabled(false);
      return setError('Debes seleccionar al menos un pais.');
    }

    createActivity(values, setIsButtonDisabled, setSuccessMessage);
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

  const handleDropDownChange = (e) => {
    setValues({
      ...values,
      season: e.target.dataset.value,
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
        <FormGroup
          showName="Nombre"
          value={values.name}
          handleChange={handleChange}
          attributes={{
            name: 'name',
            type: 'text',
            placeholder: 'Escribe el nombre de la actividad',
            required: true,
          }}
        />
        <FormGroup
          showName="Dificultad (1 - 5)"
          value={values.difficulty}
          handleChange={handleChange}
          attributes={{
            name: 'difficulty',
            type: 'number',
            placeholder: 'Escribe el nivel de dificultad',
            max: 5,
            min: 1,
            required: true,
          }}
        />
        <FormGroup
          showName="Duración (minutos)"
          value={values.duration}
          handleChange={handleChange}
          attributes={{
            name: 'duration',
            type: 'number',
            placeholder: 'Escribe la duración en minutos',
            required: true,
          }}
        />

        <div className="Form-group">
          <label>Temporada</label>
          <Dropdown
            isVisible={isDropdownOpen}
            setIsVisible={setIsDropdownOpen}
            name={values.season}
            handler={handleDropDownChange}
            values={['Verano', 'Otoño', 'Invierno', 'Primavera']}
            theme="dark"
          />
        </div>

        <div className="Form-group">
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
        <div className="Form-group">
          <button
            disabled={isButtonDisabled}
            type="submit"
            className="main-btn"
          >
            Crear actividad
          </button>
        </div>
        {error ? (
          <Error />
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
