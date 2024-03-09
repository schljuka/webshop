import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer, productDetailsReducer } from './reducers/productsReducer';
import { authReducer, userReducer } from './reducers/userReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer
});

let initialState = {};

const store = configureStore({
    reducer,
    initialState,
    devTools: true
});

export default store;
