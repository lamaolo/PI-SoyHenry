/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchActivities } from '../../actions';

import LoadingSpinner from '../../components/LoadingSpinner';

import './styles.css';

const Activities = ({ fetchActivities, activities }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities(setIsLoading);
  }, []);

  return (
    <div className="Activities-container">
      <main className="Activities">
        <header className="Activities-header">
          <h1>Todas las actividades</h1>
        </header>
        <section className="Activities-cards">
          {isLoading ? (
            <LoadingSpinner theme="dark" />
          ) : activities.length ? (
            activities.map((activity) => (
              <article key={activity.id} className="Activities-card">
                <header className="Activities-card-header">
                  <p>{activity.name}</p>
                  <p
                    className={`Activities-card-header-box ${activity.season}`}
                  >
                    {activity.season}
                  </p>
                  <p
                    className={`Activities-card-header-box ${
                      (activity.difficulty < 3 && 'Green') ||
                      (activity.difficulty > 3 && 'Red') ||
                      'Yellow'
                    }`}
                  >
                    {activity.difficulty}
                  </p>
                </header>
                <section className="Activities-card-body">
                  <p>{activity.description.slice(0, 100) + '...'}</p>
                </section>
                <section className="Activities-card-body-details">
                  <Link
                    to={`/activity/${activity.id}`}
                    className="unstyled-link"
                  >
                    Ver detalles
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
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </section>
              </article>
            ))
          ) : (
            <div className="Activities-no-activity">
              <h2>No hay ninguna actividad agregada</h2>
              <Link to="/create/activity" className="main-btn unstyled-link">
                Agrega una
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activities: state.activities,
});

export default connect(mapStateToProps, { fetchActivities })(Activities);
