import { DIALOG_OPEN, DIALOG_CLOSE } from './actionTypes';

export function dialogOpen(payload) {
  return {
    type: DIALOG_OPEN,
    payload,
  };
}

export function dialogClose() {
  return {
    type: DIALOG_CLOSE,
  };
}
