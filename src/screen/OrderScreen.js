import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderAction';

const OrderScreen = (props) => {
  const cartList = useSelector((store) => store.cartList);
  const { cartItems, payment, shipping } = cartList;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, loading, error } = orderCreate;
  const dispatch = useDispatch();

  if (!shipping.address) {
    props.history.push('/shipping');
  } else if (!payment.paymentmethod) {
    props.history.push('/payment');
  }

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
  }, [success]);

  const itemPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const shippingPrice = itemPrice > 100 ? 0 : 10;
  const taxPrice = itemPrice * 0.15;
  const totalPrice = itemPrice + shippingPrice + taxPrice;

  const handelPlaceorder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        payment,
        shipping,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }),
    );
  };

  return (
    <div className='cart'>
      <div className='cart-list'>
        <div className='cart-list-container'>
          <ul>
            <li>
              <h2>Shipping Address</h2>
              <h3>
                {shipping.city},{shipping.address},{shipping.postalcode},
                {shipping.country}
              </h3>
            </li>
            <li>
              <h2>Payment Method</h2>
              <h3>{payment.paymentmethod}</h3>
            </li>
            <li>
              <h3>Order Items</h3>
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
                    <div className='cart-qty'>Qty: {item.qty}</div>
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
        <button onClick={handelPlaceorder}>Place Order</button>
        <h2>Order Summary</h2>
        <ul className='order-items'>
          <li>
            <h3>Items</h3>
            <h4>${itemPrice}</h4>
          </li>
          <li>
            <h3>Shipping</h3>
            <h4>${shippingPrice}</h4>
          </li>
          <li>
            <h3>Tax</h3>
            <h4>${taxPrice}</h4>
          </li>
          <li>
            <h3>order Total</h3>
            <h4>${totalPrice}</h4>
          </li>
        </ul>
        <h3>Subtotal: ${totalPrice}</h3>
      </div>
    </div>
  );
};
export default OrderScreen;
