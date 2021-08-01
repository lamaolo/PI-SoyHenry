import './styles.css';

const FilterContinent = ({ continentFilter, setContinentFilter }) => {
  const handleChange = (e) => {
    setContinentFilter(e.target.value);
  };

  return (
    <div className="Filters-box-continent">
      <b>Continente</b>
      <div className="Filter-group">
        <label htmlFor="Todos">Todos</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Todos"
          value="Todos"
          checked={continentFilter === 'Todos'}
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Americas">Americas</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Americas"
          value="Americas"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Africa">Africa</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Africa"
          value="Africa"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Asia">Asia</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Asia"
          value="Asia"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Europe">Europe</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Europe"
          value="Europe"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Oceania">Oceania</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Oceania"
          value="Oceania"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Polar">Polar</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterContinent"
          id="Polar"
          value="Polar"
        />
      </div>
    </div>
  );
};

export default FilterContinent;
