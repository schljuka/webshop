
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

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

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link to="/login" className="btn" id="login_btn">Login</Link>
                <span id="cart" className="ml-3">Cart</span>
                <span className="ml-1" id="cart_count">33</span>
            </div>
        </nav>
    );
}

export default Header;

