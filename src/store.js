import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from './reducers/productReducer';
import { cartListReducer } from './reducers/cartReducer';
import {
  userSignReducer,
  userRegisterReducer,
  userUpdataReducer,
} from './reducers/userReducer';
import {
  createOrderReducer,
  orderDetailReducer,
  orderListReducer,
  orderDeleteReducer,
  myOrderReducer,
  orderPayReducer,
} from './reducers/orderReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
  cartList: { cartItems, shipping: {}, payment: {} },
  userSignin: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartList: cartListReducer,
  userSignin: userSignReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdataReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailReducer,
  listOfOrders: orderListReducer,
  orderDelete: orderDeleteReducer,
  myOrderList: myOrderReducer,
  orderPay: orderPayReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);
export default store;
