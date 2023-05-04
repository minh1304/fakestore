import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';
import axios from 'axios';
import * as productApi from '~/apiServices/productApi';
import { useSelector } from 'react-redux';
import { setProduct } from '~/features/productSlice';
import Header from '../components/Header';
import { selectUser } from '~/app/userSlice';
import { Link } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

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
                url: 'https://weak-puce-sawfish-boot.cyclic.app/api/v1/auth/me',
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
                        // console.log('admin nè');
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

    // console.log(currentUser);
    return (
        <div>
            {isAdmin ? (
                <div>
                    {/* <div>
                        <div
                            class={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bottom-0 right-0 flex items-center justify-center`}
                        >
                            <div
                                class={`bg-black/60 rounded-md p-10 transform transition `}
                            >
                                <div>
                                    <FontAwesomeIcon
                                        className="text-green-500 text-4xl"
                                        icon={faCircleCheck}
                                    />
                                </div>
                                <div className="text-white text-lg">
                                    Product added to cart
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Header data={currentUser} />
                    <div className="mt-[82px] flex">
                        <div className="text-black h-[210px] w-[300px] fixed ">
                            <div className="text-black uppercase text-xl font-semibold ml-10 mt-5 mb-5">
                                <Link to={config.routes.dashboard}>
                                    Product
                                </Link>
                            </div>
                            <hr />
                            <div className="text-black uppercase text-xl font-semibold ml-10 mt-5 mb-5">
                                <Link to={config.routes.order}>Order</Link>
                            </div>
                            <hr />
                            <div className="text-black uppercase text-xl font-semibold ml-10 mt-5 mb-5">
                                <Link to={config.routes.adjustUser}>User</Link>
                            </div>
                        </div>
                        <div className="ml-[500px]">
                            <div className="overflow-y-auto top-0 left-0 bg-white">
                                <div className="mt-5 max-w-7xl mx-auto">
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
