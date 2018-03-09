import callApi from '../../util/apiCaller';
import handleRESTResponse from '../../util/restUtils';

// Export Constants
export const START_DIMENSIONS_REQUEST = 'START_DIMENSIONS_REQUEST';
export const END_DIMENSIONS_REQUEST = 'END_DIMENSIONS_REQUEST';
export const RECEIVE_DIMENSIONS = 'RECEIVE_DIMENSIONS';

function startDimensionsRequest() {
  return {
    type: START_DIMENSIONS_REQUEST,
  };
}

function endDimensionsRequest() {
  return {
    type: END_DIMENSIONS_REQUEST,
  };
}

function receiveDimensions(dimensions) {
  return {
    type: RECEIVE_DIMENSIONS,
    dimensions,
  };
}

export function getDimensions() {
  const errorText = 'An error occurred fetching your dimensions: ';
  const errorLabel = 'Dimensions error';

  return (dispatch) => {
    dispatch(startDimensionsRequest());

    callApi('dimensions')
    .then((resp) => {
      dispatch(endDimensionsRequest());
      dispatch(handleRESTResponse({
        response: resp,
        successCallback: () => {
          dispatch(receiveDimensions(resp.dimensions));
        },
        errorText: errorText + resp.statusText,
        errorLabel,
      }));
    })
    .catch((err) => {
      dispatch(endDimensionsRequest());

      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(errorText + err.message, errorLabel);
    });
  };
}

export function getDimensionsByMetricId(metricId) {
  // debugger;
  const errorText = 'An error occurred fetching your dimensions by id: ';
  const errorLabel = 'DimensionsById error';

  return (dispatch) => {
    dispatch(startDimensionsRequest());

    callApi(`dimensionsbymetric/${metricId}`)
    .then((resp) => {
      dispatch(endDimensionsRequest());
      dispatch(handleRESTResponse({
        response: resp,
        successCallback: () => {
          // debugger;
          dispatch(receiveDimensions(resp.dimensions));
        },
        errorText: errorText + resp.statusText,
        errorLabel,
      }));
    })
    .catch((err) => {
      dispatch(endDimensionsRequest());

      /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.error(errorText + err.message, errorLabel);
    });
  };
}
