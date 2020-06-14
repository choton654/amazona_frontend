import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removFromCart } from '../actions/cartAction';
import { Link } from 'react-router-dom';
import {
  createOrder,
  detailsOrder,
  orderList,
  deleteOrder,
  listMyOrder,
} from '../actions/orderAction';
import { updateUser, logOut } from '../actions/userAction';

const ProfileScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrder());
  }, [userInfo]);

  const handelLogout = () => {
    dispatch(logOut());
    props.history.push('/signin');
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userId: userInfo._id, name, email, password }));
  };

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const {
    orders,
    success: successOrder,
    loading: loadingOrder,
    error: errorOrder,
  } = myOrderList;

  return (
    <div className='profile'>
      <div className='profile-form'>
        <div className='form'>
          <form onSubmit={handelUpdate}>
            <ul className='from-container'>
              <li>
                <h3>Update Account</h3>
              </li>
              {loading && <div>loading...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profile Update successfull</div>}
              <li className='from-email'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li className='from-email'>
                <label htmlFor='email'>Email</label>
                <input
                  type='text'
                  placeholder='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className='from-password'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>

              <li className='form-button'>
                <input
                  className='button-ed'
                  type='Submit'
                  defaultValue='Update'
                />
              </li>
              <li className='form-button'>
                <button
                  className='button-ed'
                  type='button'
                  onClick={handelLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className='profile-action'>
        {loadingOrder ? (
          <div>loading...</div>
        ) : errorOrder ? (
          <div>{errorOrder}</div>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                {/* <th>isPaid</th> */}
                <th>Total Price</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>orderId: {order._id}</td>
                  {/* <td>{order.isPaid.toString()}</td> */}
                  <td>{order.totalPrice}</td>
                  <td>{order.createdAt}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default ProfileScreen;
