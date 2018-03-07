import React, { Component, PropTypes } from 'react';

// Import Components
import MetricListItem from '../MetricListItem/MetricListItem';

class MetricsList extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.listOfMetricsRows = this.listOfMetricsRows.bind(this);
  }

  listOfMetricsRows() {
    const self = this;
    const rowsList = [];
    let selectedMetrics = this.props.metrics;

    if (this.props.selectedMetrics && self.props.selectedMetrics.length > 0) {
      selectedMetrics = this.props.metrics.filter(item => {
        return this.props.selectedMetrics.includes(item._id);
      });
    }

    selectedMetrics.forEach(metric => {
      rowsList.push(
        <MetricListItem
          metric={metric}
          metrics={self.props.metrics}
          dimensions={self.props.dimensions}
          key={`metric-list-item-row-${metric._id}`}
          filterMetricsList={self.props.filterMetricsList}
        />
      );
    });

    return rowsList;
  }

  render() {
    const noMetrics = !!((this.props.metrics === null ||
                  this.props.metrics === undefined ||
                  this.props.metrics.length <= 0));

    const noDimensions = !!((this.props.dimensions === null ||
                  this.props.dimensions === undefined ||
                  this.props.dimensions.length <= 0));

    return (
      <div className="listView table-responsive">
        <table className="metric-list-table table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Dimensions</th>
              <th scope="col">Dep 1</th>
              <th scope="col">Dep 2</th>
              <th scope="col">Dep 3</th>
            </tr>
          </thead>
            {(!noMetrics && !noDimensions) && (
              <tbody>
                {this.listOfMetricsRows()}
              </tbody>
            )}

            {(noMetrics) &&
              <tbody>
                <tr>
                  <td colSpan="7">
                    <div className="no-metrics-container">
                      <h1 className="no-metrics-title">
                        Your Metrics List is empty.
                      </h1>
                      <h3 className="no-metrics-subtitle">
                        Please add some metrics and then come back.
                      </h3>
                    </div>
                  </td>
                </tr>
              </tbody>
            }
        </table>
      </div>
    );
  }
}

MetricsList.propTypes = {
  filterMetricsList: PropTypes.func.isRequired,
  metrics: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dependent_metrics_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    latest_value: PropTypes.number.isRequired,
  })).isRequired,
  selectedMetrics: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default MetricsList;
