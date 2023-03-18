import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, setToken, setUser } from '~/app/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    console.log(user);
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [err, setErr] = useState(false);
    const loginUser = (value) => {
        axios
            .post(
                'https://api.storerestapi.com/auth/login',
                {
                    email: value.email,
                    password: value.password,
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                },
            )
            .then((response) => {
                console.log(response);
                dispatch(setToken(response.data.data.access_token));
                dispatch(setUser(response));
                navigate('/dashboard');
            })
            .catch((error) => {
                if (error) {
                    setErr(true);
                }
                console.error(error);
            });
    };
    console.log(isLogin);
    const handleLogOut = () => {
        dispatch(logout());
        window.location.reload();
    };
    const [isSubmitting, setSubmitting] = useState(false);
    return (
        <div className="grid lg:grid-cols-6">
            
            <div className="col-span-2"></div>
            {isLogin ? (
                // <div>
                <div className="mt-12 col-span-2 border-2 border-gray-300 w-[300px] h-[450px] ">
                    <div className="text-center">
                        <p className="mt-7 text-3xl font-bold">Information</p>
                    </div>
                    <div className="mt-5 text-center ">
                        <button
                            onClick={handleLogOut}
                            className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            logout
                        </button>
                    </div>
                </div>
            ) : (
                // </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string()
                            .email('Please match the request format')
                            .required('Please fill out this field'),
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
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <Field
                                                    className="w-[298.66px] h-10 bg-gray-100"
                                                    type="email"
                                                    name="email"
                                                    placeholder="bob@gmail.com"
                                                />
                                            </div>
                                            <div className="mt-1 text-red-500">
                                                <ErrorMessage name="email" />
                                            </div>
                                        </div>
                                    </div>

                                    <div div className="mt-5 ">
                                        <label
                                            className="font-semibold"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <div className="mt-2">
                                                <Field
                                                    className="w-[298.66px] h-10 bg-gray-100"
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
                                            className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            Login
                                        </button>
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
