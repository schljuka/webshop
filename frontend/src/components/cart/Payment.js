


import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios'


const options = {
    style: {
        base: {
            fontSize: '15px',
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {

    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);
    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
    const taxRate = 0.17; // Stopa poreza od 17%
    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxPrice = Number((subtotal * taxRate).toFixed(2));
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    const totalPrice = (parseFloat(itemsPrice) + shippingPrice + taxPrice).toFixed(2);


    useEffect(() => {

    }, [])

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHanlder = async (e) => {
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        let res;

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }

            }

            res = await axios.post('/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                alert.error(result.error.message)
                document.querySelector('#pay_btn').disabled = false;
            } else {
                // The payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {
                    const paymentId = result.paymentIntent.id;
                    const paymentStatus = result.paymentIntent.status;


                    // Save order to database
                    const orderData = {
                        orderItems: cartItems, // proizvodi u korpi
                        shippingInfo,
                        paymentInfo: {
                            id: paymentId,
                            status: paymentStatus
                        },
                        itemsPrice: itemsPrice,
                        taxPrice: taxPrice,
                        shippingPrice: shippingPrice,
                        totalPrice: totalPrice
                    }

                    await axios.post('/api/v1/order/new', orderData);
                    // Redirect to success page

                    sessionStorage.removeItem('orderInfo');

                    navigate('/success');

                } else {
                    alert.error('There is some issue while payment processing')
                }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.errMessage)
        }
    }






    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHanlder}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3">
                            Pay{` - ${orderInfo && orderInfo.totalPrice} €`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment;

