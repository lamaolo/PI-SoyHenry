import './styles.css';

const FilterContinent = ({ selectedContinents, handleCheckboxClick }) => {
  return (
    <div className="Filters-box-continent">
      <b>Continente</b>
      <div className="Filter-group">
        <label htmlFor="Americas">Americas</label>
        <input
          onChange={handleCheckboxClick}
          type="checkbox"
          name="Americas"
          id="Americas"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Africa">Africa</label>
        <input
          onChange={handleCheckboxClick}
          type="checkbox"
          name="Africa"
          id="Africa"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Asia">Asia</label>
        <input
          onChange={handleCheckboxClick}
          type="checkbox"
          name="Asia"
          id="Asia"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Europe">Europe</label>
        <input
          onChange={handleCheckboxClick}
          type="checkbox"
          name="Europe"
          id="Europe"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Oceania">Oceania</label>
        <input
          onChange={handleCheckboxClick}
          type="checkbox"
          name="Oceania"
          id="Oceania"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Polar">Polar</label>
        <input
          onChange={handleCheckboxClick}
          type="checkbox"
          name="Polar"
          id="Polar"
        />
      </div>
    </div>
  );
};

export default FilterContinent;
