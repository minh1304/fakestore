import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, setToken, setUser } from '~/app/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FaShoppingCart, FaRegClock, FaEye, FaEyeSlash, FaBan} from 'react-icons/fa';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '~/features/cartSlice';
import ListMyOrder from './ListMyOrder';

function Login() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [currentUser, setCurrentUser] = useState({});
    const [myOrders, setMyOrders] = useState([]);
    const [myOrdersCompleted, setMyOrdersCompleted] = useState([]);
    const [showCompletedOrders, setShowCompletedOrders] = useState(false); 
    const [myOrdersCanceled, setMyOrdersCanceled] = useState([]);
    const [showCanceledOrders, setShowCanceledOrders] = useState(false); 

    const dispatch = useDispatch();
    const [err, setErr] = useState(false);

    const loginUser = (value) => {
        axios
            .post(
                'https://fakestoresinglecontainer.azurewebsites.net/api/auth/login',
                {
                    username: value.username,
                    password: value.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data));
                navigate('/');
            })
            .catch((error) => {
                if (error) {
                    setErr(true);
                }
                console.error(error);
            });
    };

    useEffect(() => {
        if (user) {
            const token = user;
            let config = {
                method: 'get',
                url: 'https://fakestoresinglecontainer.azurewebsites.net/api/auth/me',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            axios
                .request(config)
                .then((response) => {
                    setCurrentUser(response.data.Value);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            const token = user;
            const fetchOrders = async () => {
                try {
                    const response = await axios.get('https://fakestoresinglecontainer.azurewebsites.net/api/User/GetAllOrder', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setMyOrders(response.data);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            };
            //Completed Orders
            const fetchOrdersCompleted = async () => {
                try {
                    const response = await axios.get('https://fakestoresinglecontainer.azurewebsites.net/api/User/getOrdersCompleted', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setMyOrdersCompleted(response.data);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            };
            // Canceled Orders
            const fetchOrdersCanceled = async () => {
                try {
                    const response = await axios.get('https://fakestoresinglecontainer.azurewebsites.net/api/User/getOrdersCanceled', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    setMyOrdersCanceled(response.data);
                } catch (error) {
                    console.error('Failed to fetch orders:', error);
                }
            };

            fetchOrders();
            fetchOrdersCompleted();
            fetchOrdersCanceled();
        }
    }, [user]);

    const handleLogOut = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate('/login');
    };

    const handleOrderCancel = (orderId) => {
        setMyOrders((prevOrders) =>
            prevOrders.filter((order) => order.id !== orderId) // Remove cancelled order
        );
    };
    const toggleCompletedOrders = () => {
        setShowCompletedOrders(!showCompletedOrders);
    };
    const toggleCanceledOrders = () => {
        setShowCanceledOrders(!showCanceledOrders);
    };
    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 relative z-10">
                {user ? (
                    <div className="">
                        <div className="text-gray-700 mb-4">
                            <p className="text-lg font-semibold">User Info</p>
                            <p className="text-gray-600">User: {currentUser.UserName}</p>
                            <p className="text-gray-600">Email: {currentUser.UserEmail}</p>
                        </div>
                        <button
                            onClick={handleLogOut}
                            className="mt-4 bg-red-500 w-full py-1 text-white font-semibold rounded-md hover:bg-red-700 w-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={Yup.object({
                            username: Yup.string().required('Please fill out this field'),
                            password: Yup.string()
                                .min(6, 'Passwords must be at least 6 characters')
                                .required('Please fill out this field'),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            loginUser(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <div className="text-center">
                                <p className="text-2xl font-bold mb-4">Login</p>
                                <Form>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-left font-semibold mb-1">Username</label>
                                            <Field
                                                className="w-full p-1 border border-gray-300 rounded-md bg-gray-100"
                                                type="text"
                                                name="username"
                                                placeholder="bob"
                                            />
                                            <ErrorMessage
                                                name="username"
                                                component="div"
                                                className="text-red-500 text-left mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-left font-semibold mb-1">Password</label>
                                            <Field
                                                className="w-full p-1 border border-gray-300 rounded-md bg-gray-100"
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-500 text-left mt-1"
                                            />
                                        </div>
                                        {err && (
                                            <div className="text-red-500 text-left mt-2">
                                                Incorrect username or password. Please try again.
                                            </div>
                                        )}
                                        <button
                                            className="mt-4 w-full bg-red-500 py-1 text-white font-semibold rounded-md hover:bg-red-700"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Login
                                        </button>
                                        <div className="mt-3 text-gray-600">
                                            <span>
                                                Don't have an account?
                                                <a href="/register" className="text-blue-500 ml-1">
                                                    Register here
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                )}
            </div>
            {user && (
                <div className="w-full max-w-4xl mt-6">
                    <div className="ml-6 flex items-center mb-4">
                        <FaRegClock className="text-2xl text-gray-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-700">Order Completed</h2>
                        <button
                            onClick={toggleCompletedOrders}
                            className="ml-4 bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-700 flex items-center justify-center"
                        >
                            {showCompletedOrders ? (
                                <FaEyeSlash className="text-xl" />
                            ) : (
                                <FaEye className="text-xl" />
                            )}
                        </button>
                    </div>
                    {showCompletedOrders && (
                        myOrdersCompleted.length > 0 ? (
                            myOrdersCompleted.map((order) => (
                                <ListMyOrder key={order.id} data={order} onOrderCancel={handleOrderCancel} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600">You have no completed orders yet.</p>
                        )
                    )}

                    <div className="ml-6 flex items-center mb-4">
                        <FaBan className="text-2xl text-gray-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-700">Order Canceled</h2>
                        <button
                            onClick={toggleCanceledOrders}
                            className="ml-4 bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-700 flex items-center justify-center"
                        >
                            {showCanceledOrders ? (
                                <FaEyeSlash className="text-xl" />
                            ) : (
                                <FaEye className="text-xl" />
                            )}
                        </button>
                    </div>
                    {showCanceledOrders && (
                        myOrdersCanceled.length > 0 ? (
                            myOrdersCanceled.map((order) => (
                                <ListMyOrder key={order.id} data={order} onOrderCancel={handleOrderCancel} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600">You have no cancelled orders yet.</p>
                        )
                    )}

                    <div className="ml-6 flex items-center mb-4">
                        <FaShoppingCart className="text-2xl text-gray-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-700">Your Orders:</h2>
                    </div>
                    {myOrders.length > 0 ? (
                        myOrders.map((order) => (
                            <ListMyOrder key={order.id} data={order} onOrderCancel={handleOrderCancel}/>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">You have no orders yet.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Login;
