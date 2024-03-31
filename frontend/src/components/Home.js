

// import React, { Fragment, useState, useEffect } from 'react';
// import MetaData from './layout/MetaData';
// import Product from './product/Product';
// import Loader from './layout/Loader';
// import Pagination from 'react-js-pagination';
// import PriceSlider from './layout/PriceSlider';


// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAlert } from 'react-alert';
// import { getProducts } from '../actions/productActions';

// const Home = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [price, setPrice] = useState([1, 1000]);
//     const [category, setCategory] = useState('');
//     const [rating, setRating] = useState(0);

//     const alert = useAlert();
//     const dispatch = useDispatch();
//     const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);
//     const { keyword } = useParams();


//     useEffect(() => {
//         if (error) {
//             alert.error(error);
//         } else {
//             dispatch(getProducts(keyword, currentPage, price, category, rating));
//         }
//     }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

//     function setCurrentPageNo(pageNumber) {
//         setCurrentPage(pageNumber);
//     }

//     return (
//         <Fragment>
//             {loading ? (
//                 <Loader />
//             ) : (
//                 <Fragment>
//                     <MetaData title={'Buy Best Product Online'} />
//                     <h1 id="products_heading">Latest Products</h1>
//                     <section id="products" className="container mt-5">

//                         <div className="row">
//                             {keyword ? (
//                                 <Fragment>

//                                     <PriceSlider price={price} setPrice={setPrice}
//                                         category={category} setCategory={setCategory}
//                                         rating={rating} setRating={setRating} />

//                                     <div className="col-6 col-md-9">
//                                         <div className="row">
//                                             {products && products.map(product => (
//                                                 <Product key={product._id} product={product} col={4} />
//                                             ))}
//                                         </div>

//                                     </div>
//                                 </Fragment>
//                             ) : (
//                                 products && products.map(product => (
//                                     <Product key={product._id} product={product} col={4} />
//                                 ))
//                             )}
//                         </div>
//                     </section>
//                     {resPerPage <= productsCount && (
//                         <div className='d-flex justify-content-center mt-5'>
//                             <Pagination
//                                 activePage={currentPage}
//                                 itemsCountPerPage={resPerPage}
//                                 totalItemsCount={productsCount}
//                                 onChange={setCurrentPageNo}
//                                 nextPageText={'Next'}
//                                 prevPageText={'Prev'}
//                                 firstPageText={'First'}
//                                 lastPageText={'Last'}
//                                 itemClass="page-item"
//                                 linkClass="page-link"
//                             />


//                         </div>

//                     )}
//                 </Fragment>
//             )}
//         </Fragment>


//     );
// };

// export default Home;




import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layout/MetaData';
import Product from './product/Product';
import Loader from './layout/Loader';
import Pagination from 'react-js-pagination';
import PriceSlider from './layout/PriceSlider';


import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage } = useSelector(state => state.products);
    const { keyword } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
        } else {
            dispatch(getProducts(keyword, currentPage, price, category, rating));
        }
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={'Buy Best Product Online'} />
                    <div className="container container-fluid">
                        <h1 id="products_heading">Latest Products</h1>
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {keyword ? (
                                    <Fragment>
                                        {products && products.map(product => (
                                            <Product key={product._id} product={product} col={4} />
                                        ))}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <PriceSlider price={price} setPrice={setPrice}
                                            category={category} setCategory={setCategory}
                                            rating={rating} setRating={setRating} />

                                        <div className="col-6 col-md-9">
                                            <div className="row">
                                                {products && products.length > 0 ? (
                                                    products.map(product => (
                                                        <Product key={product._id} product={product} col={4} />
                                                    ))
                                                ) : (
                                                    <div className="col-12">
                                                        <div className="col-12">
                                                            <h1>Apologies, but there are no products with this criterion at the moment.</h1>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Fragment>

                                )}
                            </div>
                        </section>
                        {resPerPage <= productsCount && (
                            <div className='d-flex justify-content-center mt-5'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;





