import './styles.css';

const FilterAlphabetically = ({ alphFilter, setAlphFilter }) => {
  const handleChange = (e) => {
    setAlphFilter(e.target.value);
  };

  return (
    <div style={{ marginTop: '20px' }} className="Filters-box-continent">
      <b>Alfabéticamente</b>
      <div className="Filter-group">
        <label htmlFor="AscendienteAlph">Asc.</label>
        <input
          onChange={handleChange}
          type="radio"
          name="alphFilter"
          id="AscendienteAlph"
          value="Ascendiente"
          checked={alphFilter === 'Ascendiente'}
        />
      </div>

      <div className="Filter-group">
        <label htmlFor="DescendienteAlph">Desc.</label>
        <input
          onChange={handleChange}
          type="radio"
          name="alphFilter"
          id="DescendienteAlph"
          value="Descendiente"
        />
      </div>
    </div>
  );
};

export default FilterAlphabetically;
