import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatedPassword from './components/user/UpdatedPassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';


import { loadUser } from './actions/userActions';
import axios from 'axios';
import Loader from './components/layout/Loader';


// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();
  }, []);




  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={isAuthenticated ? <Shipping /> : <Navigate to="/login" />} />
            <Route path="/order/confirm" element={isAuthenticated ? <ConfirmOrder /> : <Navigate to="/login" />} />
            <Route path="/success" element={isAuthenticated ? <OrderSuccess /> : <Navigate to="/login" />} />
            <Route path="/payment" element={isAuthenticated ? (<Elements stripe={loadStripe(stripeApiKey)}>
              <Payment /></Elements>
            ) : (<Navigate to="/login" />)} />





            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<NewPassword />} />
            <Route path="/me" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/me/update" element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
            <Route path="/password/update" element={isAuthenticated ? <UpdatedPassword /> : <Navigate to="/login" />} />
            <Route path="/orders/me" element={isAuthenticated ? <ListOrders /> : <Navigate to="/login" />} />


          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
