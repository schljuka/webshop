// import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// // import { persistReducer, persistStore } from 'redux-persist';
// // import storage from 'redux-persist/lib/storage';
// import {
//   productsReducer, productDetailsReducer, newReviewReducer,
//   newProductReducer, productReducer, productReviewsReducer, reviewReducer
// } from './reducers/productsReducer';
// import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
// import { cartReducer } from './reducers/cartReducers';
// import { newOrderReducer, myOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';



// const reducer = combineReducers({
//    products: productsReducer,
// productDetails: productDetailsReducer,
// newProduct: newProductReducer,
// product: productReducer,
// productReviews: productReviewsReducer,
// review: reviewReducer,
// auth: authReducer,
// user: userReducer,
// allUsers: allUsersReducer,
// userDetails: userDetailsReducer,
// forgotPassword: forgotPasswordReducer,
// cart: cartReducer,
// newOrder: newOrderReducer,
// myOrders: myOrderReducer,
// allOrders: allOrdersReducer,
// orderDetails: orderDetailsReducer,
// order: orderReducer,
// newReview: newReviewReducer,
// });


// let initialState = {
//     cart: {
//         cartItems: localStorage.getItem('cartItems')
//             ? JSON.parse(localStorage.getItem('cartItems'))
//             : [],
//         shippingInfo: localStorage.getItem('shippingInfo')
//             ? JSON.parse(localStorage.getItem('shippingInfo'))
//             : {}
//     }
// };


// const store = configureStore({
//     reducer,
//     initialState,
//     devTools: true
// });

// export default store;






// import { combineReducers } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import {
//   productsReducer, productDetailsReducer, newReviewReducer,
//   newProductReducer, productReducer, productReviewsReducer, reviewReducer
// } from './reducers/productsReducer';
// import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
// import { cartReducer } from './reducers/cartReducers';
// import { newOrderReducer, myOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const rootReducer = combineReducers({
//   products: productsReducer,
//   productDetails: productDetailsReducer,
//   newProduct: newProductReducer,
//   product: productReducer,
//   productReviews: productReviewsReducer,
//   review: reviewReducer,
//   auth: authReducer,
//   user: userReducer,
//   allUsers: allUsersReducer,
//   userDetails: userDetailsReducer,
//   forgotPassword: forgotPasswordReducer,
//   cart: cartReducer,
//   newOrder: newOrderReducer,
//   myOrders: myOrderReducer,
//   allOrders: allOrdersReducer,
//   orderDetails: orderDetailsReducer,
//   order: orderReducer,
//   newReview: newReviewReducer,

// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: true,
// });

// export const persistor = persistStore(store);

// export default store;








import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  productsReducer, productDetailsReducer, newReviewReducer,
  newProductReducer, productReducer, productReviewsReducer, reviewReducer
} from './reducers/productsReducer';
import { authReducer, userReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrderReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: orderReducer,
  newReview: newReviewReducer,
});

const preloadedState = {
  cart: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || {},
  },
};

const store = configureStore({
  reducer,
  preloadedState,
});

export default store;
