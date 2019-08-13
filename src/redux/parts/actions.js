import {
  GET_PART,
  GET_ALL_PARTS,
  STORE_PART,
  UPDATE_PART,
  DELETE_PART,
  CLEAR_MESSAGES,
} from './actionTypes';

// Get a part

export function getPart(id) {
  return {
    type: GET_PART.REQUEST,
    payload: { id },
  };
}

// Get all parts

export function getAllParts() {
  return {
    type: GET_ALL_PARTS.REQUEST,
  };
}

// Store (save/create) a part

export function storePart(action) {
  return {
    type: STORE_PART.REQUEST,
    payload: { ...action },
  };
}

// Update (save/create) a part

export function updatePart(action) {
  return {
    type: UPDATE_PART.REQUEST,
    payload: { ...action },
  };
}

// Delete a part

export function deletePart(id) {
  return {
    type: DELETE_PART.REQUEST,
    payload: { id },
  };
}

// Clear messages

export function partClearMessages() {
  return {
    type: CLEAR_MESSAGES,
  };
}
