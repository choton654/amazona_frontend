import React from 'react';
import { useSelector } from 'react-redux';
import HomeScreen from './screen/HomeScreen';
import ProductScreen from './screen/ProductScreen';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import CartScreen from './screen/CartScreen';
import SigninScreen from './screen/SigninScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProductsScreen from './screen/ProductsScreen';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import OrderScreen from './screen/OrderScreen';
import OrderDetailsScreen from './screen/OrderDetailsScreen';
import OrderListScreen from './screen/OrderListScreen';
import ProfileScreen from './screen/ProfileScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  function openSidebar() {
    document.querySelector('#sidebar').classList.add('open');
  }
  function closeSidebar() {
    document.querySelector('#sidebar').classList.remove('open');
  }
  return (
    <BrowserRouter>
      <div className='grid-container'>
        {/* header */}
        <header id='header'>
          <div className='brand'>
            {/* <button onClick={openSidebar}>&#9776;</button> */}
            <Link to='/'>amazona</Link>
          </div>
          <div className='header-links'>
            <Link to='/cart'>Cart</Link>
            {userInfo ? (
              <div>
                <Link to='/profile'>{userInfo.name}</Link>
              </div>
            ) : (
              <Link to='/signin'>Sign in</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div>
                <Link to='/orders'>Orders</Link>
                <Link to='/products'>Products</Link>
              </div>
            )}
          </div>
        </header>

        {/* sidebar */}
        {/* <aside id='sidebar'>
          <h3>Shopping Catagories</h3>
          <button className='sidebar-button' onClick={closeSidebar}>
            x
          </button>
          <ul>
            <li>
              <a href='index.html'>Shirts</a>
            </li>
            <li>
              <a href='index.html'>Pants</a>
            </li>
          </ul>
        </aside> */}

        {/* main */}
        <main id='main'>
          <div className='content'>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/signin' component={SigninScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/profile' component={ProfileScreen} />
            <Route exact path='/placeorder' component={OrderScreen} />
            <Route exact path='/orders' component={OrderListScreen} />
            <Route exact path='/order/:id' component={OrderDetailsScreen} />
            <Route exact path='/products' component={ProductsScreen} />
            <Route exact path='/products/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
          </div>
        </main>

        {/* footer */}
        <footer id='footer'>All Right Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
