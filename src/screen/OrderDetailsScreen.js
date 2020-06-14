import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderAction';

const OrderDetailsScreen = (props) => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    success: successPay,
    loading: loadingPay,
    error: errorPay,
  } = orderPay;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      props.history.push('/profile');
    }
    dispatch(detailsOrder(props.match.params.id));
  }, [successPay]);

  const handelSuccessPayment = () => {
    dispatch(payOrder(order));
  };

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error.message}</div>
  ) : (
    <div className='cart'>
      <div className='cart-list'>
        <h2> order: {order._id}</h2>
        <div className='cart-list-container'>
          <ul>
            <li>
              <h2>Shipping Address</h2>
              <h3>
                {order.shipping.city},{order.shipping.address},
                {order.shipping.postalcode},{order.shipping.country}
                <div>
                  {order.isDelivered
                    ? `Delivered At ${order.delivered}`
                    : 'Not Delivered'}
                </div>
              </h3>
            </li>
            <li>
              <h2>Payment Method</h2>
              <h3>{order.payment.paymentmethod}</h3>
              <div>{order.isPaid ? `Paid At ${order.paidAt}` : 'Not Paid'}</div>
            </li>
            <li>
              <h3>Order Items</h3>
              <div>Price</div>
            </li>
            {order.orderItems.length === 0 ? (
              <div>Cart Is Empty</div>
            ) : (
              order.orderItems.map((item) => (
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
        <ul className='order-items'>
          <li className='action-payment'>
            {loadingPay && <div>Finishing payment... </div>}
            {!order.isPaid && (
              <button className='button-indent' onClick={handelSuccessPayment}>
                PAYPAL
              </button>
            )}
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <h3>Items</h3>
            <h4>${order.itemPrice}</h4>
          </li>
          <li>
            <h3>Shipping</h3>
            <h4>${order.shippingPrice}</h4>
          </li>
          <li>
            <h3>Tax</h3>
            <h4>${order.taxPrice}</h4>
          </li>
          <li>
            <h3>order Total</h3>
            <h4>${order.totalPrice}</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default OrderDetailsScreen;
