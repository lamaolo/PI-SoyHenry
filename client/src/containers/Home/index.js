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
    <div>
      {countries.map(({ image, continent, name }) => {
        <CountryCard image={image} continent={continent} name={name} />;
      })}
    </div>
  );
};
