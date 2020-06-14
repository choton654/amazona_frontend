import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cartList = useSelector((store) => store.cartList);
  const { cartItems } = cartList;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, []);

  const removeItem = (productId) => {
    dispatch(removFromCart(productId));
  };

  const checkOutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className='cart'>
      <div className='cart-list'>
        <div className='cart-list-container'>
          <ul>
            <li>
              <h3>Shopping Cart</h3>
              <div>Price</div>
            </li>
            {cartItems.length === 0 ? (
              <div>Cart Is Empty</div>
            ) : (
              cartItems.map((item) => (
                <li key={item.id}>
                  <div className='cart-img'>
                    <img src={item.image} alt='product-img' />
                  </div>
                  <div className='cart-name'>
                    <div>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </div>
                    <div className='cart-qty'>
                      Qty:{' '}
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(addToCart(item.id, e.target.value))
                        }>
                        {[...Array(item.countQty).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        type='button'
                        className='delete'
                        onClick={() => removeItem(item.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='cart-price'>
                    <h3> ${item.price}</h3>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className='cart-action'>
        <h3>
          Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)} Items) : ${' '}
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h3>
        <button onClick={checkOutHandler} disabled={cartItems.length === 0}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};
export default CartScreen;
