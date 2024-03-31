import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user, loading } = useSelector(state => state.auth);
    const { cartItems } = useSelector(state => state.cart);

    const logoutHandler = () => {
        dispatch(logout());

        alert.success('Logged out successfully')
    }



    const searchHandler = (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value.trim();
        if (keyword) {
            navigate(`/search/${keyword}`);
        } else {
            navigate('/');
        }
    }

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </div>
            </div>



            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <form onSubmit={searchHandler}>
                    <div className="input-group">
                        <input
                            type="text"
                            id="search_field"
                            className="form-control"
                            placeholder="Enter Product Name ..."
                            name="keyword"
                        />
                        <div className="input-group-append">
                            <button id="search_btn" className="btn">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>


            <div className="col-12 col-md-3 mt-4 mt-md-2 text-center cart">
                <Link to="/cart" style={{ textDecoration: 'none' }}>
                    <span id="cart" className="ml-3">Cart</span>
                    <span id="cart_count">{cartItems.length}</span>
                </Link>

                {user ? (

                    <div className="ml-4 dropdown">
                        <Link to="#!" className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <figure className="avatar avatar-nav">
                                <img src={user.avatar && user.avatar.url} alt={user && user.name}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>{user && user.name}</span>
                        </Link>

                        <div className="dropdown-menu">
                            {
                                user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )
                            }
                            <Link className="dropdown-item" to="/orders/me">Orders</Link>
                            <Link className="dropdown-item" to="/me">Profile</Link>
                            <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</Link>
                        </div>
                    </div>
                ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
            </div>

        </nav>
    );
}

export default Header;




