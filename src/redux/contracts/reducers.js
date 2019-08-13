import {
  GET_CONTRACT,
  GET_ALL_CONTRACTS,
  STORE_CONTRACT,
  UPDATE_CONTRACT,
  CHANGE_CONTRACT_FILE,
  DELETE_CONTRACT,
  CLEAR_MESSAGES,
} from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  success: null,
  error: null,
  contract: [],
  data: [],
};

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    // GET_CONTRACT

    case GET_CONTRACT.REQUEST:
      return { ...state, isLoading: true };

    case GET_CONTRACT.SUCCESS:
      return { ...state, isLoading: false, contract: action.data };

    case GET_CONTRACT.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // GET_ALL_CONTRACT

    case GET_ALL_CONTRACTS.REQUEST:
      return { ...state, isLoading: true };

    case GET_ALL_CONTRACTS.SUCCESS:
      return { ...state, isLoading: false, data: action.data };

    case GET_ALL_CONTRACTS.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // STORE_CONTRACT

    case STORE_CONTRACT.REQUEST:
      return { ...state, isLoading: true };

    case STORE_CONTRACT.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case STORE_CONTRACT.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // UPDATE_CONTRACT

    case UPDATE_CONTRACT.REQUEST:
      return { ...state, isLoading: true };

    case UPDATE_CONTRACT.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case UPDATE_CONTRACT.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // CHANGE_CONTRACT_FILE

    case CHANGE_CONTRACT_FILE:
      return {
        ...state,
        isLoading: false,
        contract: {
          ...state.contract,
          filename: action.filename,
        },
      };

      // DELETE_CONTRACT

    case DELETE_CONTRACT.REQUEST:
      return { ...state, isLoading: true };

    case DELETE_CONTRACT.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case DELETE_CONTRACT.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // CLEAR_MESSAGES

    case CLEAR_MESSAGES:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };

      // DEFAULT

    default:
      return state;
  }
}
