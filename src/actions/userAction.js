import Axios from 'axios';
import Cookie from 'js-cookie';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  USER_LOGOUT,
} from '../constants/userConstant';

const signinUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_IN_REQUEST, payload: { email, password } });
    const { data } = await Axios.post('/api/user/signin', { email, password });
    dispatch({ type: SIGN_IN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: SIGN_IN_FAIL, payload: error.message });
  }
};

const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST, payload: { name, email, password } });
    const { data } = await Axios.post('/api/user/register', {
      name,
      email,
      password,
    });
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.message });
  }
};

const updateUser = ({ userId, name, email, password }) => async (
  dispatch,
  getState,
) => {
  try {
    console.log(userId);
    dispatch({
      type: UPDATE_REQUEST,
      payload: { userId, name, email, password },
    });

    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/user/${userId}`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      },
    );
    dispatch({
      type: UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_FAIL,
      payload: error,
    });
  }
};

const logOut = () => (dispatch) => {
  Cookie.remove('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export { signinUser, registerUser, updateUser, logOut };
