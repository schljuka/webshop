import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';


import { loadUser } from './actions/userActions';
import Loader from './components/layout/Loader';


function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()).then(() => setLoading(false));
  }, [dispatch]);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (loading) {
    return <Loader/>;
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/me" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
