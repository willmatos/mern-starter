import callApi from '../../util/apiCaller';
import handleRESTResponse from '../../util/restUtils';

// Export Constants
export const START_METRICS_REQUEST = 'START_METRICS_REQUEST';
export const END_METRICS_REQUEST = 'END_METRICS_REQUEST';
export const RECEIVE_METRICS = 'RECEIVE_METRICS';

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
