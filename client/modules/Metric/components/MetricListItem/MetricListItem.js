import React, { Component, PropTypes } from 'react';

// Import Components
import StatusBadge from '../StatusBadge/StatusBadge';
import DimensionsList from '../DimensionsList/DimensionsList';

export class MetricListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.relatedMetricsColumns = this.relatedMetricsColumns.bind(this);
    this.onMetricLinkClick = this.onMetricLinkClick.bind(this);
  }

  onMetricLinkClick() {
    const self = this;

    const metricsFilter = {
      selected_parent_metric: self.props.metric,
      dependent_metrics_ids: self.props.metric.dependent_metrics_ids,
    };

    this.props.filterMetricsList(metricsFilter);
  }

  relatedMetricsColumns() {
    const self = this;

    const relatedMetrics = self.props.metrics.filter(item => {
      return self.props.metric.dependent_metrics_ids.includes(item._id);
    });

    const relatedMetricsColumns = [];

    relatedMetrics.forEach((relatedMetric, relatedMetricIndex) => {
      if (relatedMetricIndex < 3) {
        relatedMetricsColumns.push(
          <td key={`related-metrics-column-${relatedMetric._id}`}>
            {relatedMetric.name}
          </td>
        );
      }
    });

    if (relatedMetrics.length < 3) {
      let i = 0;

      while (i < (3 - relatedMetrics.length)) {
        relatedMetricsColumns.push(<td key={`related-metrics-column-empty-${this.props.metric}-${i}`}></td>);
        i++;
      }
    }

    return relatedMetricsColumns;
  }

  render() {
    const noDimensions = !!((this.props.dimensions === null ||
                  this.props.dimensions === undefined ||
                  this.props.dimensions.length <= 0));

    return (
      <tr key={this.props.metric._id}>
        <th scope="row">
          <a
            onClick={() => this.onMetricLinkClick()}
            className="dependent-metric-link"
          >
            {this.props.metric._id}
          </a>
        </th>
        <td>
          <a
            onClick={() => this.onMetricLinkClick()}
            className="dependent-metric-link"
          >
            {this.props.metric.name}
          </a>
        </td>
        <td>
          <StatusBadge
            status={this.props.metric.status}
          />
        </td>
        {(!noDimensions) &&
          <td>
            <DimensionsList
              dimensionsIds={this.props.metric.dimensions}
              dimensions={this.props.dimensions}
            />
          </td>
        }
        {this.relatedMetricsColumns()}
      </tr>
    );
  }
}

MetricListItem.propTypes = {
  filterMetricsList: PropTypes.func.isRequired,
  metric: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
    dependent_metrics_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
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

export default MetricListItem;
