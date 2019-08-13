import { takeEvery, put, call } from 'redux-saga/effects';
import PartsService from '../../services/PartsService';

import {
  GET_ALL_PARTS, GET_PART, STORE_PART, UPDATE_PART, DELETE_PART,
} from './actionTypes';

import { CONN_ERROR_MSG } from '../../utils/constants';

// GET ALL

function* getAllParts() {
  try {
    const result = yield call(PartsService.getAllParts);
    if (result.status === 200) {
      yield put({ type: GET_ALL_PARTS.SUCCESS, data: result.data });
    } else {
      yield put({ type: GET_ALL_PARTS.FAILURE, error: result.error });
    }
  } catch (e) {
    yield put({ type: GET_ALL_PARTS.FAILURE, error: CONN_ERROR_MSG });
  }
}

// GET

function* getPart(action) {
  try {
    const { id } = action.payload;
    const result = yield call(PartsService.getPart, id);
    if (result.status === 200) {
      const { data } = result;
      yield put({ type: GET_PART.SUCCESS, data: data[0] });
    } else {
      yield put({ type: GET_PART.FAILURE, error: result.error });
    }
  } catch (e) {
    yield put({ type: GET_PART.FAILURE, error: CONN_ERROR_MSG });
  }
}

// STORE

function* storePart(action) {
  try {
    const result = yield call(PartsService.storePart, action);
    if (result.status === 200) {
      yield put({ type: STORE_PART.SUCCESS, success: 'A parte foi cadastrada com sucesso' });
    } else {
      yield put({ type: STORE_PART.FAILURE, error: 'Ocorreu um erro ao cadastrar a parte' });
    }
  } catch (e) {
    yield put({ type: STORE_PART.FAILURE, error: CONN_ERROR_MSG });
  }
}

// UPDATE

function* updatePart(action) {
  try {
    const result = yield call(PartsService.updatePart, action.payload);
    if (result.status === 200) {
      yield put({ type: UPDATE_PART.SUCCESS, success: 'Parte atualizada com sucesso' });
    } else {
      yield put({ type: UPDATE_PART.FAILURE, error: 'Ocorreu um erro ao atualizar a parte' });
    }
  } catch (e) {
    yield put({ type: UPDATE_PART.FAILURE, error: CONN_ERROR_MSG });
  }
}

// DELETE

function* deletePart(action) {
  try {
    const result = yield call(PartsService.destroy, action.payload.id);
    if (result.status === 200) {
      yield put({ type: DELETE_PART.SUCCESS, success: 'Parte excluída com sucesso' });
    } else {
      yield put({ type: DELETE_PART.FAILURE, error: 'Ocorreu um erro ao excluir a parte' });
    }
  } catch (e) {
    yield put({ type: DELETE_PART.FAILURE, error: CONN_ERROR_MSG });
  }
}

export default [
  takeEvery(GET_ALL_PARTS.REQUEST, getAllParts),
  takeEvery(GET_PART.REQUEST, getPart),
  takeEvery(STORE_PART.REQUEST, storePart),
  takeEvery(UPDATE_PART.REQUEST, updatePart),
  takeEvery(DELETE_PART.REQUEST, deletePart),
];
