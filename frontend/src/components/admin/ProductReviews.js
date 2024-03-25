import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, clearErrors, deleteReview } from '../../actions/productActions';
import { useAlert } from 'react-alert'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'




const ProductReviews = () => {

    const { id } = useParams();
    const [productId, setProductId] = useState('');

    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector(state => state.auth);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, reviews } = useSelector(state => state.productReviews) || {};
    const { isDeleted } = useSelector(state => state.review) || {};




    useEffect(() => {
        if (error) {
            alert.error("This id does not exist");
            dispatch(clearErrors())
        }
        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }
        if (isDeleted) {
            alert.success('Review deleted successfully')
            dispatch({ type: DELETE_REVIEW_RESET })
        }

    }, [dispatch, alert, error, navigate, productId, isDeleted, reviews]);

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    }


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        if (reviews && reviews.length > 0) {
            reviews.forEach(review => {
                data.rows.push({
                    id: review._id,
                    rating: review.rating,
                    comment: review.comment,
                    user: review.name,
                    actions:
                        <button className="btn btn-danger py-1 px-1 ml-2">
                            <i className='fa fa-trash' onClick={() => deleteReviewHandler(review._id)}></i>
                        </button>
                })
            })
        }
        return data;
    }


    return (
        <Fragment>
            <MetaData title={'Product Reviews'} />

            {
                user && (!isAuthenticated || user.role === 'admin') ? (
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>
                        <div className="col-12 col-md-10">
                            <Fragment>

                                <div className="row justify-content-center mt-5">
                                    <div className="col-5">
                                        <form onSubmit={submitHandler}>
                                            <div className="form-group">
                                                <label htmlFor="productId_field">Enter Product ID</label>
                                                <input
                                                    type="text"
                                                    id="productId_field"
                                                    className="form-control"
                                                    value={productId}
                                                    onChange={(e) => setProductId(e.target.value)}
                                                />
                                            </div>

                                            <button
                                                id="search_button"
                                                type="submit"
                                                className="btn btn-primary btn-block py-2"
                                            >
                                                SEARCH
                                            </button>
                                        </ form>
                                    </div>

                                </div>

                                {reviews && reviews.length > 0 ? (
                                    <MDBDataTable
                                        data={setReviews()}
                                        className='px-3'
                                        bordered
                                        striped
                                        hover
                                    />
                                ) : (
                                    <p className="mt-5 text-center">No reviews</p>
                                )}
                            </Fragment>
                        </div>
                    </div>
                ) : !loading && (navigate("/"))
            }

        </Fragment>
    )
}

export default ProductReviews;

