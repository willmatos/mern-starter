import React, { PropTypes } from 'react';

function StatusBadge(props) {
  switch (props.status) {
    case 0:
      return (
        <span className="badge badge-success">OK</span>
      );

    case 1:
      return (
        <span className="badge badge-danger">Error</span>
      );

    case 2:
      return (
        <span className="badge badge-warning">Working</span>
      );

    default:
      return (
        <span className="badge badge-secondary">N/A</span>
      );
  }
}

StatusBadge.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusBadge;
