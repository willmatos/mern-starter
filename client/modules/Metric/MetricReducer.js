import {
  START_METRICS_REQUEST,
  END_METRICS_REQUEST,
  RECEIVE_METRICS,
  UPDATE_SELECTED_METRICS,
  SET_METRICS_FILTER,
} from './MetricActions';

const defaultMetricsState = {
  isFetchingMetrics: false,
  metrics: [],
  selectedMetrics: [],
  filters: {},
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

    case UPDATE_SELECTED_METRICS :
      return {
        ...state,
        selectedMetrics: action.metricsIDs,
      };

    case SET_METRICS_FILTER :
      return {
        ...state,
        filters: action.filters,
      };

    default:
      return state;
  }
}
