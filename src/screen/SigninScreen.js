import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signinUser } from '../actions/userAction';

const SigninScreen = (props) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const userSignin = useSelector((store) => store.userSignin);
  const { loading, error, userInfo } = userSignin;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser(email, password));
  };

  return (
    <div className='form'>
      <form onSubmit={handelSubmit}>
        <ul className='from-container'>
          <li>
            <h3>Sign In</h3>
          </li>
          {loading && <div>loading...</div>}
          {error && <div>{error}</div>}
          <li className='from-email'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              placeholder='email'
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </li>
          <li className='from-password'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </li>
          <li className='form-button'>
            <input type='Submit' defaultValue='Submit' />
          </li>

          <li>New In Amazona</li>
          <Link
            id='create-account'
            to={
              redirect === '/' ? 'register' : 'register?redirect=' + redirect
            }>
            Create New Account
          </Link>
        </ul>
      </form>
    </div>
  );
};
export default SigninScreen;
