import Axios from 'axios';
import Cookie from 'js-cookie';
import {
  CART_ADD,
  CART_ADD_FAIL,
  CART_REMOVE,
  SHIPPING,
  PAYMENT,
} from '../constants/cartConstant';

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({
      type: CART_ADD,
      payload: {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countQty: data.countQty,
        qty,
      },
    });
  } catch (error) {
    dispatch({ type: CART_ADD_FAIL, payload: error.message });
  }
  const {
    cartList: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

const removFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE, payload: productId });

  const {
    cartList: { cartItems },
  } = getState();
  Cookie.set('cartItems', JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: PAYMENT, payload: data });
};

export { addToCart, removFromCart, saveShipping, savePayment };
