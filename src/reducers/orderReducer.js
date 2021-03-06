import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
} from '../constants/orderConstant';

const createOrderReducer = (
  state = { order: {}, loading: false, success: false, error: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderDetailReducer = (
  state = { order: {}, loading: false, error: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderListReducer = (
  state = { orders: [], loading: false, error: {} },
  action,
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderDeleteReducer = (state = { orders: {} }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload, success: true };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return { loading: true };
    case MY_ORDER_SUCCESS:
      return { loading: false, orders: action.payload, success: true };
    case MY_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const orderPayReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  createOrderReducer,
  orderDetailReducer,
  orderListReducer,
  orderDeleteReducer,
  myOrderReducer,
  orderPayReducer,
};
