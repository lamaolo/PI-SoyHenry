import './styles.css';

const FilterPopulation = ({ populationFilter, setPopulationFilter }) => {
  const handleChange = (e) => {
    setPopulationFilter(e.target.value);
  };

  return (
    <div className="Filters-box-continent">
      <b>Población</b>
      <div className="Filter-group">
        <label htmlFor="Ascendiente">Asc.</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterpopulation"
          id="Ascendiente"
          value="Ascendiente"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Descendiente">Desc.</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterpopulation"
          id="Descendiente"
          value="Descendiente"
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="Ninguno">Ninguno</label>
        <input
          onChange={handleChange}
          type="radio"
          name="filterpopulation"
          id="Ninguno"
          checked={populationFilter === 'Ninguno'}
          value="Ninguno"
        />
      </div>
    </div>
  );
};

export default FilterPopulation;
