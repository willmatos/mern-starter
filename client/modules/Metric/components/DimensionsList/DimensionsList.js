import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Actions
import { getDimensionsByMetricId } from '../../../Dimension/DimensionActions';
// debugger;

// Import Style
import styles from './DimensionsList.css';

// Import Components
import DimensionsListDetailed from '../DimensionsListDetailed/DimensionsListDetailed';

function mapStateToProps({
  dimensions: {
    dimensions,
  },
}) {
  return {
    dimensions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDimensionsByMetricId: (metricId) => {
      dispatch(getDimensionsByMetricId(metricId));
    },
  };
}

export class DimensionsList extends Component {
  constructor(props) {
    super(props);

    this.state = { showExpandedDimensions: false };

    this.expandDimensions = this.expandDimensions.bind(this);
    this.listDimensionAbbreviations = this.listDimensionAbbreviations.bind(this);
  }

  componentDidMount() {
    if (this.props.metric) {
      // debugger;
      this.props.getDimensionsByMetricId(this.props.metric._id);
    }
  }

  expandDimensions = () => {
    this.setState({showExpandedDimensions: true}); // eslint-disable-line
  };

  listDimensionAbbreviations() {
    const self = this;
    const dimensionAbbreviationsList = [];
    let dimensionsToShow = [];

    if (this.props.dimensions.length > 0 && this.props.dimensions.length <= 3) {
      dimensionsToShow = this.props.dimensions;
    } else {
      dimensionsToShow = this.props.dimensions.slice(0, 3);
    }

    if (dimensionsToShow && dimensionsToShow.length > 0) {
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
    }

    return dimensionAbbreviationsList;
  }

  render() {
    return (
      <div>
        {(this.state.showExpandedDimensions === false) ? (
          <div className="listView">
            {this.listDimensionAbbreviations()}
          </div>
        ) : (
          <DimensionsListDetailed
            dimensions={this.props.dimensions}
          />
        )}
      </div>
    );
  }
}

DimensionsList.propTypes = {
  getDimensionsByMetricId: PropTypes.func.isRequired,
  metric: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dependent_metrics_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latest_value: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DimensionsList);
