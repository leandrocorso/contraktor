import {
  GET_PART,
  GET_ALL_PARTS,
  STORE_PART,
  UPDATE_PART,
  DELETE_PART,
  CLEAR_MESSAGES,
} from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  success: null,
  error: null,
  contract: [],
  part: [],
  data: [],
};

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    // GET_PART

    case GET_PART.REQUEST:
      return { ...state, isLoading: true };

    case GET_PART.SUCCESS:
      return { ...state, isLoading: false, part: action.data };

    case GET_PART.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // GET_ALL_CONTRACT

    case GET_ALL_PARTS.REQUEST:
      return { ...state, isLoading: true };

    case GET_ALL_PARTS.SUCCESS:
      return { ...state, isLoading: false, data: action.data };

    case GET_ALL_PARTS.FAILURE:
      return { ...state, isLoading: false, data: action.error };

      // STORE_PART

    case STORE_PART.REQUEST:
      return { ...state, isLoading: true };

    case STORE_PART.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case STORE_PART.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // UPDATE_PART

    case UPDATE_PART.REQUEST:
      return { ...state, isLoading: true };

    case UPDATE_PART.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case UPDATE_PART.FAILURE:
      return { ...state, isLoading: false, error: action.error };

      // DELETE_PART

    case DELETE_PART.REQUEST:
      return { ...state, isLoading: true };

    case DELETE_PART.SUCCESS:
      return { ...state, isLoading: false, success: action.success };

    case DELETE_PART.FAILURE:
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
