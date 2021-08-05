import './styles.css';

const FormGroup = ({ showName, value, handleChange, attributes }) => (
  <div className="Form-group">
    <label htmlFor={attributes.name}>{showName}</label>
    <input
      {...attributes}
      id={attributes.name}
      autoComplete="off"
      value={value}
      onChange={handleChange}
    />
  </div>
);

export default FormGroup;
