import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './MetricsPage.css';

// Import Components
import MetricsList from '../../components/MetricsList/MetricsList';

// Import Actions
import {
  getMetrics,
} from '../../MetricActions';

import {
  getDimensions,
} from '../../../Dimension/DimensionActions';

function mapStateToProps({
  metrics: {
    metrics,
  },
  dimensions: {
    dimensions,
  },
}) {
  return {
    metrics,
    dimensions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMetrics: () => {
      dispatch(getMetrics());
    },
    getDimensions: () => {
      dispatch(getDimensions());
    },
  };
}

class MetricsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getMetrics();
    this.props.getDimensions();
  }

  render() {
    return (
      <div>
        <h1 className={styles['metrics-page-title']}>All Metrics</h1>
        <MetricsList metrics={this.props.metrics} dimensions={this.props.dimensions} />
      </div>
    );
  }
}

MetricsPage.propTypes = {
  getMetrics: PropTypes.func.isRequired,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dependent_metrics_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  getDimensions: PropTypes.func.isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latest_value: PropTypes.number.isRequired,
  })).isRequired,
};

MetricsPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MetricsPage);
