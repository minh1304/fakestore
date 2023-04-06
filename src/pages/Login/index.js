import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, setToken, setUser } from '~/app/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    //user: chỉ lưu token
    const user = useSelector(selectUser);
    //current user: thông tin của ng dùng
    const [currentUser, setCurrentUser] = useState({});
    const dispatch = useDispatch();
    const [err, setErr] = useState(false);
    const loginUser = (value) => {
        axios
            .post(
                //api fake
                // 'https://api.storerestapi.com/auth/login',

                //api me
                'http://localhost:3000/api/v1/auth/login',
                {
                    username: value.username,
                    password: value.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            )
            .then((response) => {
                console.log(response);
                dispatch(setToken(response.data.token));
                dispatch(setUser(response));
                // navigate('/dashboard');
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
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user]);
    console.log(currentUser.username);

    // console.log(user);

    const handleLogOut = () => {
        dispatch(logout());
        window.location.reload();
    };
    const [isSubmitting, setSubmitting] = useState(false);
    return (
        <div className="grid lg:grid-cols-6">
            <div className="col-span-2"></div>
            {user ? (
                // <div>
                <div className="mt-12 col-span-2 border-2 border-gray-300 w-[300px] h-[450px]  z-10">
                    <div className="text-center">
                        <p className="mt-7 text-2xl font-bold">Information</p>
                    </div>
                    <div className="m-3">
                        <p>User name: {currentUser.username}</p>
                        <p>email: {currentUser.email}</p>
                        <p>Phone: {currentUser.phone}</p>
                        <p>Role: {currentUser.role}</p>
                    </div>
                    <div className="mt-20 text-center ">
                        <button
                            onClick={handleLogOut}
                            className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                // </div>
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string().required(
                            'Please fill out this field',
                        ),
                        password: Yup.string()
                            .min(6, 'Passwords must be at least 6 characters')
                            .required('Please fill out this field'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        loginUser(values);
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <div className="mt-12 col-span-2 border-2 border-gray-300 h-[450px]  ">
                            <div className="text-center">
                                <p className="mt-7 text-3xl font-bold">Login</p>
                            </div>
                            <Form>
                                <div className="w-[300px] mx-auto">
                                    <div className="mt-5 ">
                                        <label
                                            className="font-semibold "
                                            // htmlFor="email"
                                        >
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <Field
                                                    className="w-[298.66px] h-10 bg-gray-100 relative z-10"
                                                    type="text"
                                                    name="username"
                                                    placeholder="bob"
                                                />
                                            </div>
                                            <div className="mt-1 text-red-500">
                                                <ErrorMessage name="username" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 ">
                                        <label
                                            className="font-semibold"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <Field
                                                    className="w-[298.66px] h-10 bg-gray-100  relative z-10"
                                                    type="password"
                                                    name="password"
                                                    placeholder="
                                                    Please enter a password"
                                                />
                                            </div>
                                            <div className="mt-1 text-red-500">
                                                <ErrorMessage name="password" />
                                            </div>
                                        </div>
                                    </div>
                                    {err && (
                                        <div className="mt-3">
                                            <p className="text-red-500">
                                                The user name or password is
                                                incorrect, please type again
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-5 text-center ">
                                        <button
                                            className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700 relative z-10"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Login
                                        </button>
                                        <div className="mt-5 text-black/60">
                                            <span>
                                                Don't have an account?
                                                <a href='/register' className='text-blue-500'> Register here</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            )}
            <div className="col-span-2"></div>
        </div>
    );
}

export default Login;
