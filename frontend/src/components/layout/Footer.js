import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

const Footer = () => {

    const { user, loading } = useSelector(state => state.auth);


    return (
        <Fragment>

            {!loading && user && user.role !== 'admin' && (
                <footer className="py-1">
                    <p className="text-center mt-1">
                        Shopping Cart - 2024, All Rights Reserved
                    </p>
                </footer>
            )}

        </Fragment>
    )
}

export default Footer;


