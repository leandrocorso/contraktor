import { all } from 'redux-saga/effects';

import contractsSagas from './contracts/sagas';
import partsSagas from './parts/sagas';

export default function* rootSagas() {
  yield all([...contractsSagas, ...partsSagas]);
}
