/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import { useSearchCountries } from '../../hooks/useSearchCountry';
import { fetchCountries, updateActivity } from '../../actions';

import './styles.css';

const EditingActivity = ({
  activity,
  countries: allCountries,
  handleButtonClick,
  fetchCountries,
  updateActivity,
}) => {
  const description = useRef(null);
  const [countries, setCountries] = useState(activity.countries);
  const [isAddCountriesVisible, setAddCountriesVisible] = useState(false);
  const [query, setQuery, filteredCountries] = useSearchCountries(allCountries);

  useEffect(() => {
    fetchCountries();
  }, []);

  const [values, setValues] = useState({
    name: activity.name,
    description: activity.description,
    difficulty: activity.difficulty,
    season: activity.season,
    duration: activity.duration,
    countries: activity.countries.map((c) => c.id),
  });

  const handleChange = (e) => {
    if (e.target.name === 'difficulty') {
      if (e.target.value > 5) {
        e.target.value = 5;
      } else if (e.target.value < 1) {
        e.target.value = '';
      }
    }

    if (e.target.id === 'description') {
      setValues({
        ...values,
        description: e.currentTarget.textContent,
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    }
  };

  const removeCountry = (id) => {
    setValues({
      ...values,
      countries: values.countries.filter((c) => c !== id),
    });

    setCountries(countries.filter((c) => c.id !== id));
  };

  const addCountry = (country) => {
    if (!values.countries.find((c) => c === country.id)) {
      setValues({
        ...values,
        countries: [...values.countries, country.id],
      });
      setCountries([...countries, country]);

      setAddCountriesVisible(false);
      setQuery('');
    }
  };

  const updateChanges = () => {
    if (values.countries.length) {
      updateActivity(values, activity.id, refresh);
    } else {
      alert('Debes seleccionar al menos un pais.');
    }
  };

  const refresh = () => {
    window.location.reload();
  };

  return (
    <main className="Activity Edit-Activity">
      <header className="Activity-header">
        <input
          onChange={handleChange}
          value={values.name}
          type="text"
          name="name"
          autoComplete="off"
          className="input-name"
          placeholder="Nuevo nombre..."
        />
        <button
          style={{ background: '#00FF00', color: 'white' }}
          onClick={updateChanges}
          className="main-btn"
        >
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
          Guardar
        </button>
      </header>
      <section className="Activity-body">
        <div className="Activity-body-group">
          <div className="Activity-body-group-title">
            <b>Acerca de la actividad</b>
            <div className="separator"></div>
          </div>
          <span
            role="textbox"
            contentEditable
            suppressContentEditableWarning={true}
            name="description"
            id="description"
            ref={description}
            className="input-description"
            onInput={handleChange}
          >
            {activity.description}
          </span>
        </div>
        <div className="Activity-cards">
          <div
            className={`Activity-body-card ${
              (values.difficulty < 3 && 'Green') ||
              (values.difficulty > 3 && 'Red') ||
              'Yellow'
            }`}
          >
            <b>Dificultad</b>
            <input
              className="input-difficulty"
              type="number"
              name="difficulty"
              value={values.difficulty}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Dificultad..."
            />
          </div>
          <div className={`Activity-body-card ${values.season} Card-season`}>
            <b>Temporada</b>
            <p>{values.season}</p>
            <select
              className="input-season-select"
              onChange={handleChange}
              name="season"
              value={values.season}
              id=""
            >
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
          </div>
          <div className="Activity-body-card">
            <b>Duración</b>
            <div>
              <input
                value={values.duration}
                type="number"
                name="duration"
                className="input-duration"
                onChange={handleChange}
              />
              <p>minutos</p>
            </div>
          </div>
        </div>
      </section>
      <section className="Activity-countries">
        <div className="Activity-body-group-title">
          <b>Paises donde realizar esta actividad</b>
          <div className="separator"></div>
        </div>
        <div className="Activity-countries-container">
          {countries.map((country) => (
            <article key={country.id} className="Activity-countries-card">
              <img src={country.image} alt={country.name} />
              <div className="Activity-countries-card-hover">
                <button
                  style={{ background: 'red', color: 'white' }}
                  onClick={() => removeCountry(country.id)}
                  className="main-btn"
                >
                  Borrar pais
                </button>
              </div>
            </article>
          ))}
          <article
            onClick={() => setAddCountriesVisible(!isAddCountriesVisible)}
            className={`Activity-countries-card add-country`}
          >
            <img
              src="https://image.flaticon.com/icons/png/512/117/117885.png"
              alt=""
            />
          </article>
        </div>
      </section>
      <section
        className={`Add-country-form ${isAddCountriesVisible && 'visible'}`}
      >
        <header className="Add-country-form-header">
          <p>Añade paises</p>
          <button
            onClick={() => setAddCountriesVisible(false)}
            className="unstyled-btn"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <section className="Add-country-search">
          <input
            type="text"
            placeholder="Busca un pais..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </section>
        <section className="Add-country-countries">
          {filteredCountries.length ? (
            filteredCountries.map((c) => (
              <article
                key={c.id}
                onClick={() => addCountry(c)}
                className="Add-country-card"
              >
                <p>{c.name}</p>
              </article>
            ))
          ) : (
            <p className="Add-country-countries-error">
              No hay ningún pais con ese nombre.
            </p>
          )}
        </section>
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countries,
});

export default connect(mapStateToProps, { fetchCountries, updateActivity })(
  EditingActivity
);
