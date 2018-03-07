import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './MetricsPage.css';

// Import Components
import MetricsList from '../../components/MetricsList/MetricsList';

// Import Actions
import {
  getMetrics,
  applyMetricsFilter,
  clearMetricsFilter,
} from '../../MetricActions';

import {
  getDimensions,
} from '../../../Dimension/DimensionActions';

function mapStateToProps({
  metrics: {
    metrics,
    selectedMetrics,
    filters,
  },
  dimensions: {
    dimensions,
  },
}) {
  return {
    metrics,
    selectedMetrics,
    filters,
    dimensions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMetrics: () => {
      dispatch(getMetrics());
    },
    applyMetricsFilter: (filters) => {
      dispatch(applyMetricsFilter(filters));
    },
    clearMetricsFilter: () => {
      dispatch(clearMetricsFilter());
    },
    getDimensions: () => {
      dispatch(getDimensions());
    },
  };
}

class MetricsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedParentMetric: null,
      filterApplied: false,
    };

    this.filterMetricsList = this.filterMetricsList.bind(this);
    this.resetMetricsFilter = this.resetMetricsFilter.bind(this);
    this.getNavigationPath = this.getNavigationPath.bind(this);
  }

  componentDidMount() {
    this.props.getMetrics();
    this.props.getDimensions();
  }

  getNavigationPath() {
    if (this.state.filterApplied) {
      return (
        <h1 className={styles['metric-list-page-title']}>
          <a className={styles['clear-selected-metrics-link']} onClick={() => this.resetMetricsFilter()}>All Metrics</a> &gt; {this.state.selectedParentMetric.name}
        </h1>
      );
    }

    return (<h1 className={styles['metric-list-page-title']}>All Metrics</h1>);
  }

  filterMetricsList(filters) {
    this.props.applyMetricsFilter(filters.dependent_metrics_ids);
    this.setState({ selectedParentMetric: filters.selected_parent_metric });
    this.setState({ filterApplied: true });
  }

  resetMetricsFilter() {
    this.props.clearMetricsFilter();
    this.setState({ selectedParentMetric: null });
    this.setState({ filterApplied: false });
  }

  render() {
    return (
      <div>
        {this.getNavigationPath()}

        <MetricsList metrics={this.props.metrics} dimensions={this.props.dimensions} filterMetricsList={this.filterMetricsList} selectedMetrics={this.props.selectedMetrics} />
      </div>
    );
  }
}

MetricsPage.propTypes = {
  getMetrics: PropTypes.func.isRequired,
  applyMetricsFilter: PropTypes.func.isRequired,
  clearMetricsFilter: PropTypes.func.isRequired,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dependent_metrics_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.string),
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
