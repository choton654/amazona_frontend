import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import {
  createOrder,
  detailsOrder,
  orderList,
  deleteOrder,
} from '../actions/orderAction';

const OrderListScreen = (props) => {
  const listOfOrders = useSelector((state) => state.listOfOrders);
  const { orders, loading, error } = listOfOrders;
  console.log(listOfOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderList());
  }, []);

  const handelDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className='order-header'>
        <h2>Orders</h2>
      </div>
      <div className='product-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>isPaid</th>
              <th>isDelivered</th>
              <th>Total Price</th>
              <th>Created At</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{order.isDelivered.toString()}</td>
                <td>{order.totalPrice}</td>
                <td>{order.createdAt}</td>
                <td>{order.delivered}</td>
                <td>
                  <Link to={`/order/${order._id}`} className='button-ed'>
                    Details
                  </Link>{' '}
                  <button
                    onClick={() => handelDelete(order._id)}
                    className='button-ed'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderListScreen;
