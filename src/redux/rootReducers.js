import { combineReducers } from 'redux';

import contractsReducer from './contracts/reducers';
import partsReducer from './parts/reducers';
import dialogReducer from './dialog/reducers';

const rootReducers = combineReducers({
  contracts: contractsReducer,
  parts: partsReducer,
  dialog: dialogReducer,
});

export default rootReducers;
