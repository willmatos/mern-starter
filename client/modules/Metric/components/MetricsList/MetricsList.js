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

    this.props.metrics.forEach(metric => {
      rowsList.push(
        <MetricListItem
          metric={metric}
          metrics={self.props.metrics}
          dimensions={self.props.dimensions}
          key={`metric-list-item-row-${metric._id}`}
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
      <div className="table-responsive">
        <table className="table table-bordered">
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
                    <div>
                      <h1>
                        Your Metrics List is empty.
                      </h1>
                      <h3>
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
};

export default MetricsList;
