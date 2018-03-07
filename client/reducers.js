/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import metrics from './modules/Metric/MetricReducer';
import dimensions from './modules/Dimension/DimensionReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  metrics,
  dimensions,
  posts,
  intl,
});
