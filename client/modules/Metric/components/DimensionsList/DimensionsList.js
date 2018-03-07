import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './DimensionsList.css';

// Import Components
import DimensionsListDetailed from '../DimensionsListDetailed/DimensionsListDetailed';

export class DimensionsList extends Component {
  constructor(props) {
    super(props);

    this.state = { showExpandedDimensions: false };

    this.expandDimensions = this.expandDimensions.bind(this);
    this.listDimensionAbbreviations = this.listDimensionAbbreviations.bind(this);
  }

  expandDimensions = () => {
    this.setState({showExpandedDimensions: true}); // eslint-disable-line
  };

  listDimensionAbbreviations(filteredDimensions) {
    const self = this;
    const dimensionAbbreviationsList = [];
    let dimensionsToShow = [];

    if (this.props.dimensionsIds.length <= 3) {
      dimensionsToShow = filteredDimensions;
    } else {
      dimensionsToShow = filteredDimensions.slice(0, 3);
    }

    dimensionsToShow.forEach((dimension, dimensionIndex, dimensionsArray) => {
      dimensionAbbreviationsList.push(
        <span key={`dimensions-abbreviations-list-item-${dimension._id}`}>
          {dimension.name}

          {(dimensionIndex !== dimensionsArray.length - 1) ? (
            <span>, </span>
          ) : (
            <a className={styles['dimensionlist-dimension-expand-link']} onClick={() => self.expandDimensions()}> ...</a>
          )}
        </span>);
    });

    return dimensionAbbreviationsList;
  }

  render() {
    if (this.props.dimensionsIds && this.props.dimensions && this.props.dimensionsIds.length > 0 && this.props.dimensions.length > 0) {
      const filteredDimensions = this.props.dimensions.filter(item => {
        return this.props.dimensionsIds.includes(item._id);
      });

      return (
        <div>
          {(this.state.showExpandedDimensions === false) ? (
            <div className="listView">
              {this.listDimensionAbbreviations(filteredDimensions)}
            </div>
          ) : (
            <DimensionsListDetailed
              dimensions={filteredDimensions}
            />
          )}
        </div>
      );
    }
    return <span>None</span>;
  }
}

DimensionsList.propTypes = {
  dimensionsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latest_value: PropTypes.number.isRequired,
  })).isRequired,
};

export default DimensionsList;
