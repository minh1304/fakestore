import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '~/app/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
    const authUser = JSON.parse(localStorage.getItem('user'));
    console.log(authUser);
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (!authUser) return;
        else {
            setIsLogin(true);
            dispatch(setToken(authUser.data.data.access_token));
            dispatch(setUser(authUser));
        }
    }, [authUser]);
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
                localStorage.setItem('user', JSON.stringify(response));
                setIsLogin(true);
            })
            .catch((error) => console.error(error));
    };
    console.log(isLogin);
    const handleLogOut = () => {
        localStorage.removeItem('user');
        window.location.reload();
        setIsLogin(false);
    };
    const [isSubmitting, setSubmitting] = useState(false);
    return (
        <div className="grid grid-cols-6">
            <div className="col-span-2"></div>
            {isLogin ? (
                <div>
                    <button onClick={handleLogOut}>logout</button>
                </div>
            ) : (
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
                                <div className='w-[300px] mx-auto'>
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
