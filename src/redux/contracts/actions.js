import {
  GET_CONTRACT,
  GET_ALL_CONTRACTS,
  STORE_CONTRACT,
  UPDATE_CONTRACT,
  CHANGE_CONTRACT_FILE,
  DELETE_CONTRACT,
  CLEAR_MESSAGES,
} from './actionTypes';

// Get a contract

export function getContract(id) {
  return {
    type: GET_CONTRACT.REQUEST,
    payload: { id },
  };
}

// Get all contracts

export function getAllContracts() {
  return {
    type: GET_ALL_CONTRACTS.REQUEST,
  };
}

// Store (save/create) a contract

export function storeContract(action) {
  return {
    type: STORE_CONTRACT.REQUEST,
    payload: { ...action },
  };
}

// Change the contract file

export function changeContractFile(action) {
  return {
    type: CHANGE_CONTRACT_FILE,
    filename: action,
  };
}

// Update (save/create) a contract

export function updateContract(action) {
  return {
    type: UPDATE_CONTRACT.REQUEST,
    payload: { ...action },
  };
}

// Delete a contract

export function deleteContract(id) {
  return {
    type: DELETE_CONTRACT.REQUEST,
    id,
  };
}

// Clear messages

export function contractClearMessages() {
  return {
    type: CLEAR_MESSAGES,
  };
}
