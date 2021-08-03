import { Link } from "react-router-dom";

import "./styles.css";

const CountryCard = ({ id, name, continent, image }) => {
  return (
    <article className="CountryCard">
      <img src={image} alt={name} />
      <div className="CountryCard-name">
        <h1>{name}</h1>
        <p>{continent}</p>
      </div>
      <div className="CountryCard-action">
        <Link className="unstyled-link" to={`/country/${id.toLowerCase()}`}>
          <button className="main-btn">Ver detalles</button>
        </Link>
      </div>
    </article>
  );
};

export default CountryCard;
