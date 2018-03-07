import {
  START_DIMENSIONS_REQUEST,
  END_DIMENSIONS_REQUEST,
  RECEIVE_DIMENSIONS,
} from './DimensionActions';

const defaultDimensionsState = {
  isFetchingDimensions: false,
  dimensions: [],
};

export default function dimensions(state = defaultDimensionsState, action) {
  switch (action.type) {

    case START_DIMENSIONS_REQUEST:
      return {
        ...state,
        isFetchingDimensions: true,
      };

    case END_DIMENSIONS_REQUEST:
      return {
        ...state,
        isFetchingDimensions: false,
      };

    case RECEIVE_DIMENSIONS:
      return {
        ...state, dimensions: action.dimensions,
      };

    default:
      return state;
  }
}
