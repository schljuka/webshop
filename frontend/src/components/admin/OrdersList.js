import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, clearErrors } from '../../actions/orderActions';
import { useAlert } from 'react-alert'





const OrdersList = () => {



    const navigate = useNavigate();

    const { user } = useSelector(state => state.auth);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)


    useEffect(() => {

        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }


        // if (isDeleted) {
        //     alert.success('Product deleted successfully')
        //     navigate("/admin/products")
        //     dispatch({ type: DELETE_PRODUCT_RESET })
        // }
    }, [dispatch, alert, error, navigate,])


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Itmes',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amout',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        if (orders && orders.length > 0) {
            orders.forEach(order => {
                data.rows.push({
                    id: order._id,
                    numofItems: order.orderItems.length,
                    amount: `${order.totalPrice} €`,
                    status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                        ? <p style={{ color: 'green' }}> {order.orderStatus}</p>
                        : <p style={{ color: 'red' }}> {order.orderStatus}</p>,
                    actions:
                        <Fragment>
                            <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-1'>
                                <i className='fa fa-eye'></i></Link>
                            <button className="btn btn-danger py-1 px-1 ml-2">
                                <i className='fa fa-trash'></i>
                            </button>
                        </Fragment>
                })
            })
        }

        return data;
    }




    return (
        <Fragment>
            <MetaData title={'All Orders'} />

            {
                user && user.role === 'admin' ? (
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>
                        <div className="col-12 col-md-10">
                            <Fragment>
                                <h1 className="my-5">All Orders</h1>
                                {loading ? <Loader /> : (

                                    <MDBDataTable
                                        data={setOrders()}
                                        className='px-3'
                                        bordered
                                        striped
                                        hover
                                    />
                                )}
                            </Fragment>
                        </div>
                    </div>
                ) : !loading && (navigate("/"))
            }

        </Fragment>
    )
}

export default OrdersList;
