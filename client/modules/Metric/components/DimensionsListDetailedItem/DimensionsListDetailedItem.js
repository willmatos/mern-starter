import React, { PropTypes } from 'react';

function DimensionsListDetailedItem(props) {
  return (
    <div>
      {`${props.dimension.name} : ${props.dimension.latest_value}`}
    </div>
  );
}

DimensionsListDetailedItem.propTypes = {
  dimension: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latest_value: PropTypes.number.isRequired,
  }).isRequired,
};

export default DimensionsListDetailedItem;
