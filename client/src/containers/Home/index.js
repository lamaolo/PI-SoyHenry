import { useState, useEffect } from 'react';
import axios from 'axios';

import { CountryCard } from '../../components/CountryCard';

import './styles.css';

export const Home = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios('http://localhost:3001/api/countries')
      .then(({ data: { data } }) => setCountries(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="Home">
      <main className="Home-countries">
        {countries.slice(0, 20).map(({ id, image, continent, name }) => (
          <CountryCard
            id={id}
            image={image}
            continent={continent}
            name={name}
          />
        ))}
      </main>
    </div>
  );
};
