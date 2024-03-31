import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import { Carousel, Button, Modal } from 'react-bootstrap';
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews';


import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions'
import { addItemToCart } from '../../actions/cartActions';

import { NEW_REVIEW_RESET } from '../../constants/productConstants'



const ProductDetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');



    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    
    useEffect(() => {
        dispatch(getProductDetails(id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success('Review posted successfully');
            dispatch({ type: NEW_REVIEW_RESET })

        }

    }, [dispatch, alert, error, reviewError, success, id]);



    const addToCart = () => {
        dispatch(addItemToCart(id, quantity))
        alert.success('Item Added to Cart')
    }


    const increaseQty = () => {
        if (quantity >= product.stock) {
            return;
        }
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQty = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(prevQuantity => prevQuantity - 1);
    };



    const setUserRating = () => {
        const stars = document.querySelectorAll('.star');

        const starMouseOver = (index) => {
            stars.forEach((star, i) => {
                if (i <= index) {
                    star.classList.add('yellow');
                } else {
                    star.classList.remove('yellow');
                }
            });
        };

        const starMouseOut = () => {
            stars.forEach((star) => {
                star.classList.remove('yellow');
            });
        };

        const starClick = (index) => {
            setRating(index + 1);
            stars.forEach((star, i) => {
                if (i <= index) {
                    star.classList.add('orange');
                } else {
                    star.classList.remove('orange');
                }
            });
        };

        stars.forEach((star, index) => {
            star.addEventListener('mouseover', () => starMouseOver(index));
            star.addEventListener('mouseout', starMouseOut);
            star.addEventListener('click', () => starClick(index));
        });
    };





    const reviewHandler = () => {
        const formData = new FormData();
        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);
        dispatch(newReview(formData))

    }

    return (
        <Fragment>

            {loading ? <Loader></Loader> :
                <Fragment>
                    <MetaData title={product && product.name ? product.name : 'Product Details'} />
                    <div className="container container-fluid">
                        <div className="row f-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map(image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img className="d-block w-100" src={image.url} alt={product.title} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3>{product.name}</h3>
                                <p id="product_id">Product # {product._id}</p>

                                <hr />

                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                </div>
                                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                <hr />

                                <p id="product_price">{product.price} €</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                    <span className="btn btn-primary plus"
                                        onClick={increaseQty}>+</span>
                                </div>

                                <button type="button" id="cart_btn" className="btn btn-primary d-inline addToCart"
                                    disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>

                                <hr />

                                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                                {user ?
                                    <button id="review_btn" type="button" className="btn btn-primary mt-4"
                                        data-bs-toggle="modal" data-bs-target="#ratingModal" onClick={setUserRating}>
                                        Submit Your Review
                                    </button> :
                                    <div className="alert alert-danger mt-5" type='alert'> Login to post your review</div>
                                }

                                <div className="row mt-2 mb-5">
                                    <div className="rating w-50">
                                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <ul className="stars" >
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                        </ul>
                                                        <textarea
                                                            name="review"
                                                            id="review"
                                                            className="form-control mt-3"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}>
                                                        </textarea>
                                                        <button id="review_btn" className="my-3 float-right review-btn px-4 text-white w-100"
                                                            onClick={reviewHandler}
                                                            data-bs-dismiss="modal" aria-label="Close"
                                                        >Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}
                </Fragment>
            }
        </Fragment >
    )
}

export default ProductDetails;


