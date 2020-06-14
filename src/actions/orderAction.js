import Axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
} from '../constants/orderConstant';

const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const orderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    console.log(userInfo.token);

    const { data } = await Axios.get('/api/orders', {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_SUCCESS, payload: error.message });
  }
};

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error });
  }
};

const listMyOrder = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/orders/mine', {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: MY_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_FAIL, payload: error });
  }
};

const payOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/${order._id}`, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    console.log('order data', data);

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error });
  }
};

export {
  createOrder,
  detailsOrder,
  orderList,
  deleteOrder,
  listMyOrder,
  payOrder,
};
