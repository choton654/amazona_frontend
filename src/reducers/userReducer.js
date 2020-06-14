import {
  SIGN_IN_REQUEST,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
} from '../constants/userConstant';

const userSignReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return { loading: true };
    case SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    case SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    default:
      return state;
  }
};

const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    default:
      return state;
  }
};

const userUpdataReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return { loading: true };
    case UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    default:
      return state;
  }
};

export { userSignReducer, userRegisterReducer, userUpdataReducer };
