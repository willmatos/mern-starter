import React, { PropTypes } from 'react';

// Import Components
import DimensionsListDetailedItem from '../DimensionsListDetailedItem/DimensionsListDetailedItem';

function DimensionsListDetailed(props) {
  return (
    <div className="listView">
      {
        props.dimensions.map(dimension => (
          <DimensionsListDetailedItem
            key={`dimensions-list-exapnaded-item-${dimension._id}`}
            dimension={dimension}
          />
        ))
      }
    </div>
  );
}

DimensionsListDetailed.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latest_value: PropTypes.number.isRequired,
  })).isRequired,
};

export default DimensionsListDetailed;
