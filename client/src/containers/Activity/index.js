/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Error from '../../components/Error';
import { setLoading, fetchActivity, removeActivityDetail } from '../../actions';

import './styles.css';
import EditingActivity from '../../components/EditingActivity';

const Activity = ({ activity, error, removeActivityDetail, fetchActivity }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchActivity(id);

    return () => removeActivityDetail();
  }, []);

  const handleButtonClick = (e) => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="Activity-container">
      {error ? (
        <Error />
      ) : isEditing ? (
        <EditingActivity
          handleButtonClick={handleButtonClick}
          activity={activity}
        />
      ) : (
        <main className="Activity">
          <header className="Activity-header">
            <h1>{activity.name}</h1>
            <button onClick={handleButtonClick} className="main-btn">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Editar actividad
            </button>
          </header>
          <section className="Activity-body">
            <div className="Activity-body-group">
              <div className="Activity-body-group-title">
                <b>Acerca de la actividad</b>
                <div className="separator"></div>
              </div>
              <p>{activity.description}</p>
            </div>
            <div className="Activity-cards">
              <div
                className={`Activity-body-card ${
                  (activity.difficulty < 3 && 'Green') ||
                  (activity.difficulty > 3 && 'Red') ||
                  'Yellow'
                }`}
              >
                <b>Dificultad</b>
                <p>{activity.difficulty}</p>
              </div>
              <div className={`Activity-body-card ${activity.season}`}>
                <b>Temporada</b>
                <p>{activity.season}</p>
              </div>
              <div className="Activity-body-card">
                <b>Duración</b>
                <div>
                  <p>{activity.duration}</p>
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
              {activity.countries?.map((country) => (
                <article key={country.id} className="Activity-countries-card">
                  <img src={country.image} alt={country.name} />
                  <div className="Activity-countries-card-hover">
                    <Link to={`/country/${country.id}`}>
                      <button className="main-btn">Ver pais</button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  activity: state.activityDetail,
  error: state.error,
  loading: state.loading,
});

export default connect(mapStateToProps, {
  fetchActivity,
  setLoading,
  removeActivityDetail,
})(Activity);
