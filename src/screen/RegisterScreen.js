import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/userAction';

const RegisterScreen = (props) => {
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [repassword, setrepassword] = useState('');
  const userRegister = useSelector((store) => store.userRegister);
  const { loading, error, userInfo } = userRegister;
  const dispatch = useDispatch();

  console.log(props);
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
    dispatch(registerUser(name, email, password));
  };

  return (
    <div className='form'>
      <form onSubmit={handelSubmit}>
        <ul className='from-container'>
          <li>
            <h3>Create New Account</h3>
          </li>
          {loading && <div>loading...</div>}
          {error && <div>{error}</div>}
          <li className='from-email'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              placeholder='name'
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </li>
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
          <li className='from-password'>
            <label htmlFor='repassword'>re-password</label>
            <input
              type='password'
              placeholder='re-password'
              value={repassword}
              onChange={(e) => setrepassword(e.target.value)}
            />
          </li>
          <li className='form-button'>
            <input type='Submit' defaultValue='Submit' />
          </li>

          <li>Already have an account</li>
          <Link
            id='create-account'
            to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}>
            Sign In
          </Link>
        </ul>
      </form>
    </div>
  );
};
export default RegisterScreen;
