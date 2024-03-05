// import { combineReducers, applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import * as thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import { productsReducer } from './reducers/productsReducer';

// const reducer = combineReducers({

//     products: productsReducer


// });


// let initialState = {}

// const middleware = [thunk];
// const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

// export default store;


import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer, productDetailsReducer } from './reducers/productsReducer';
import { authReducer } from './reducers/userReducers'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    auth: authReducer
});

let initialState = {};

const store = configureStore({
    reducer,
    initialState,
    devTools: true
});

export default store;
