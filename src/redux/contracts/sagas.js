import { takeEvery, put, call } from 'redux-saga/effects';
import ContractsService from '../../services/ContractsService';

import {
  GET_ALL_CONTRACTS,
  GET_CONTRACT,
  STORE_CONTRACT,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
} from './actionTypes';

import { CONN_ERROR_MSG } from '../../utils/constants';

// GET ALL

function* getAllContracts() {
  try {
    const result = yield call(ContractsService.getAllContracts);
    if (result.status === 200) {
      yield put({ type: GET_ALL_CONTRACTS.SUCCESS, data: result.data });
    } else {
      yield put({ type: GET_ALL_CONTRACTS.FAILURE, error: result.error });
    }
  } catch (e) {
    yield put({ type: GET_ALL_CONTRACTS.FAILURE, error: CONN_ERROR_MSG });
  }
}

// GET

function* getContract(action) {
  try {
    const { id } = action.payload;
    const result = yield call(ContractsService.getContract, id);
    if (result.status === 200) {
      const { data } = result;
      yield put({ type: GET_CONTRACT.SUCCESS, data: data[0] });
    } else {
      yield put({ type: GET_CONTRACT.FAILURE, error: result.error });
    }
  } catch (e) {
    yield put({ type: GET_CONTRACT.FAILURE, error: CONN_ERROR_MSG });
  }
}

// STORE

function* storeContract(action) {
  try {
    const result = yield call(ContractsService.storeContract, action);
    if (result.status === 200) {
      yield put({ type: STORE_CONTRACT.SUCCESS, success: 'Contrato salvo com sucesso' });
    } else {
      yield put({ type: STORE_CONTRACT.FAILURE, error: 'Ocorreu um erro ao salvar o contrato' });
    }
  } catch (e) {
    yield put({ type: STORE_CONTRACT.FAILURE, error: CONN_ERROR_MSG });
  }
}

// UPDATE

function* updateContract(action) {
  try {
    const result = yield call(ContractsService.updateContract, action);
    if (result.status === 200) {
      yield put({ type: UPDATE_CONTRACT.SUCCESS, success: 'Contrato atualizado com sucesso' });
    } else {
      yield put({ type: UPDATE_CONTRACT.FAILURE, error: 'Erro ao atualizar o contrato' });
    }
  } catch (e) {
    yield put({ type: UPDATE_CONTRACT.FAILURE, error: CONN_ERROR_MSG });
  }
}

// DELETE

function* deleteContract(action) {
  try {
    const result = yield call(ContractsService.destroy, action.id);
    if (result.status === 200) {
      yield put({ type: DELETE_CONTRACT.SUCCESS, success: 'Contrato excluído com sucesso' });
    } else {
      yield put({ type: DELETE_CONTRACT.FAILURE, error: 'Erro ao excluir o contrato' });
    }
  } catch (e) {
    yield put({ type: DELETE_CONTRACT.FAILURE, error: CONN_ERROR_MSG });
  }
}

export default [
  takeEvery(GET_ALL_CONTRACTS.REQUEST, getAllContracts),
  takeEvery(GET_CONTRACT.REQUEST, getContract),
  takeEvery(STORE_CONTRACT.REQUEST, storeContract),
  takeEvery(UPDATE_CONTRACT.REQUEST, updateContract),
  takeEvery(DELETE_CONTRACT.REQUEST, deleteContract),
];
