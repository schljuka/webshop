import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearErrors, deleteUser } from '../../actions/userActions';
import { useAlert } from 'react-alert'
import { DELETE_USER_RESET } from '../../constants/userConstants'





const UsersList = () => {



    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector(state => state.auth);

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers)
    const { isDeleted } = useSelector(state => state.user)


    useEffect(() => {

        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            alert.success('User deleted successfully')
            navigate("/admin/users")
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, navigate, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }


    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
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

        if (users && users.length > 0) {
            users.forEach(elem => {
                data.rows.push({
                    id: elem._id,
                    name: elem.name,
                    email: elem.email,
                    role: elem.name,
                    actions:
                        <Fragment>
                            <Link to={`/admin/user/${elem._id}`} className='btn btn-primary py-1 px-1'>
                                <i className='fa fa-pencil'></i></Link>
                            <button className="btn btn-danger py-1 px-1 ml-2">
                                <i className='fa fa-trash' onClick={() => deleteUserHandler(elem._id)}></i>
                            </button>
                        </Fragment>
                })
            })
        }

        return data;
    }



    return (
        <Fragment>
            <MetaData title={'All Users'} />

            {
                user && (!isAuthenticated || user.role === 'admin') ? (
                    <div className="row">
                        <div className="col-12 col-md-2">
                            <Sidebar />
                        </div>
                        <div className="col-12 col-md-10">
                            <Fragment>
                            <div className="container container-fluid tablemdb-w">
                                    <h1 className="my-5">All Users</h1>
                                    {loading ? <Loader /> : (

                                        <MDBDataTable
                                            data={setUsers()}
                                            className='px-3 mdbtable'
                                            bordered
                                            striped
                                            hover
                                        />
                                    )}
                                </div>
                            </Fragment>
                        </div>
                    </div>
                ) : !loading && (navigate("/"))
            }

        </Fragment>
    )
}

export default UsersList;
