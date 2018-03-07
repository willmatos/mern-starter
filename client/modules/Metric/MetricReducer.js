import {
  START_METRICS_REQUEST,
  END_METRICS_REQUEST,
  RECEIVE_METRICS,
} from './MetricActions';

const defaultMetricsState = {
  isFetchingMetrics: false,
  metrics: [],
};

export default function metrics(state = defaultMetricsState, action) {
  switch (action.type) {

    case START_METRICS_REQUEST:
      return {
        ...state,
        isFetchingMetrics: true,
      };

    case END_METRICS_REQUEST:
      return {
        ...state,
        isFetchingMetrics: false,
      };

    case RECEIVE_METRICS:
      return {
        ...state, metrics: action.metrics,
      };

    default:
      return state;
  }
}
