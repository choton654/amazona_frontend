import {
  CART_ADD,
  CART_REMOVE,
  SHIPPING,
  PAYMENT,
} from '../constants/cartConstant';

const cartListReducer = (
  state = { cartItems: [], shipping: {}, payment: {} },
  action,
) => {
  switch (action.type) {
    case CART_ADD:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.id === item.id);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.id === product.id ? item : x,
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE:
      return {
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case SHIPPING:
      return { ...state, shipping: action.payload };
    case PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
};
export { cartListReducer };
