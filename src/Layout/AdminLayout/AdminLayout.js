import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';

import * as productApi from '~/apiServices/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '~/features/productSlice';
import Header from '../components/Header';
import { selectUser } from '~/app/userSlice';
import { Link } from 'react-router-dom';
import config from '~/config';

// Initialize Firebase

function AdminLayout({ children }) {
    const user = useSelector(selectUser);
    console.log('user ở admin layout: ', user);

    return (
        <div>
            {user ? (
                <div>
                    <Header />
                    <div className="grid grid-cols-10 mt-[82px]">
                        <div className="col-span-2 bg-gray-400 h-[205.6px] ">
                            <div className="text-white uppercase text-xl font-semibold ml-10 mt-5 mb-5">
                                <Link to={config.routes.dashboard}>
                                    Product
                                </Link>
                            </div>
                            <hr />
                            <div className="text-white uppercase text-xl font-semibold ml-10 mt-5 mb-5">
                                <Link to={config.routes.order}>Order</Link>
                            </div>
                            <hr />
                            <div className="text-white uppercase text-xl font-semibold ml-10 mt-5 mb-5">
                                <Link to={config.routes.adjustUser}>User</Link>
                            </div>
                        </div>
                        <div className="col-span-8">
                            <div className="overflow-y-auto top-0 left-0 bg-white">
                                <div className="mt-[82px] max-w-7xl mx-auto">
                                    <div>{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />{' '}
                </div>
            ) : (
                <h1 className="mt-10 ml-10 text-3xl">Not have access</h1>
            )}
        </div>
    );
}

export default AdminLayout;
