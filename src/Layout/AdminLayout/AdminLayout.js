import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';
import axios from 'axios';
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
    const [currentUser, setCurrentUser] = useState({});
    const [isAdmin, setIsAdmin] = useState();
    useEffect(() => {
        if (user) {
            //call api get information current user
            const token = user.data.token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/v1/auth/me',
                headers: {
                    'x-access-token': token,
                },
            };

            axios
                .request(config)
                .then((response) => {
                    setCurrentUser(response.data);
                    if (response.data.role === 'admin') {
                        setIsAdmin(true);
                        console.log('admin nè');
                    } else {
                        setIsAdmin(false);
                        console.log('K phải admin');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);

    console.log(isAdmin);
    return (
        <div>
            {isAdmin ? (
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
