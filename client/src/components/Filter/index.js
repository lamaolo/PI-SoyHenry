const Filter = ({ isVisible, setIsVisible, name, handler, values }) => {
  return (
    <div
      className="Filters unstyled-btn"
      onClick={() => setIsVisible(!isVisible)}
    >
      {name}.
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${isVisible ? 'rotate' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <div className={`Filters-box ${isVisible && 'visible'}`}>
        {values.map((value, index) => (
          <p
            onClick={handler}
            key={index}
            data-value={value}
            className="Filter"
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Filter;
