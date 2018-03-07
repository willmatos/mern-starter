import callApi from '../../util/apiCaller';
import handleRESTResponse from '../../util/restUtils';

// Export Constants
export const START_METRICS_REQUEST = 'START_METRICS_REQUEST';
export const END_METRICS_REQUEST = 'END_METRICS_REQUEST';
export const RECEIVE_METRICS = 'RECEIVE_METRICS';
export const SET_METRICS_FILTER = 'SET_METRICS_FILTER';
export const UPDATE_SELECTED_METRICS = 'UPDATE_SELECTED_METRICS';

function startMetricsRequest() {
  return {
    type: START_METRICS_REQUEST,
  };
}

function endMetricsRequest() {
  return {
    type: END_METRICS_REQUEST,
  };
}

function receiveMetrics(metrics) {
  return {
    type: RECEIVE_METRICS,
    metrics,
  };
}

function setMetricsFilter(filters) {
  return {
    type: SET_METRICS_FILTER,
    filters,
  };
}

function updateSelectedMetrics(metricsIDs) {
  return {
    type: UPDATE_SELECTED_METRICS,
    metricsIDs,
  };
}

export function getMetrics() {
  const errorText = 'An error occurred fetching your metrics: ';
  const errorLabel = 'Metrics error';

  return (dispatch) => {
    dispatch(startMetricsRequest());

    callApi('metrics')
    .then((resp) => {
      dispatch(endMetricsRequest());
      dispatch(
        handleRESTResponse({
          response: resp,
          successCallback: () => {
            dispatch(receiveMetrics(resp.metrics));
          },
          errorText: errorText + resp.statusText,
          errorLabel,
        })
      );
    })
    .catch((err) => {
      dispatch(endMetricsRequest());

      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(errorText + err.message, errorLabel);
    });
  };
}

export function applyMetricsFilter(filters) {
  return (dispatch) => {
    dispatch(setMetricsFilter(filters));
    dispatch(updateSelectedMetrics(filters));
  };
}

export function clearMetricsFilter() {
  return (dispatch) => {
    const nullFilter = {};

    dispatch(applyMetricsFilter(nullFilter));
    dispatch(updateSelectedMetrics([]));
  };
}
