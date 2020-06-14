import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userAction';
import { saveShipping } from '../actions/cartAction';

const ShippingScreen = (props) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalcode, setPostalcode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ city, address, postalcode, country }));
    props.history.push('payment');
  };

  return (
    <div className='form'>
      <form onSubmit={handelSubmit}>
        <ul className='from-container'>
          <li>
            <h3>Shipping</h3>
          </li>

          <li className='from-email'>
            <label htmlFor='email'>Address</label>
            <input
              type='text'
              placeholder='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </li>
          <li className='from-email'>
            <label htmlFor='city'>City</label>
            <input
              type='text'
              placeholder='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </li>
          <li className='from-password'>
            <label htmlFor='Postal Code'>Postal Code</label>
            <input
              type='text'
              placeholder='Postal Code'
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
            />
          </li>
          <li className='from-password'>
            <label htmlFor='country'>Country</label>
            <input
              type='text'
              placeholder='country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
export default ShippingScreen;
