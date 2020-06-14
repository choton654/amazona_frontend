import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userAction';
import { savePayment } from '../actions/cartAction';

const PaymentScreen = (props) => {
  const [paymentmethod, setPaymentmethod] = useState('');

  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentmethod }));
    props.history.push('placeorder');
  };

  return (
    <div className='form'>
      <form onSubmit={handelSubmit}>
        <ul className='from-container'>
          <li>
            <h3>Payment</h3>
          </li>

          <li className='from-email'>
            <label htmlFor='paypal'>Paypal</label>
            <input
              type='radio'
              value='paypal'
              onChange={(e) => setPaymentmethod(e.target.value)}
            />
          </li>
          <li className='form-button'>
            <input
              className='button-primary'
              type='Submit'
              defaultValue='Continue'
            />
          </li>
        </ul>
      </form>
    </div>
  );
};
export default PaymentScreen;
