import { connect } from 'react-redux';

import './styles.css';

const Error = ({ error }) => (
  <div className="Error">
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
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h2>{error}</h2>
  </div>
);

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps)(Error);
