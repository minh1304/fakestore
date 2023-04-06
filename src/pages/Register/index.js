import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, setToken, setUser } from '~/app/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [checkErr, setCheckErr] = useState(false);
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const signUpUser = (value) => {
        console.log(value);
        let data = JSON.stringify({
            email: value.email,
            username: value.username,
            password: value.password,
            phone: value.phone,
            name: {
                firstname: value.firstName,
                lastname: value.lastName,
            },
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/auth/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response);
                setCheckErr(false);
                alert('Register Success!!')
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                setCheckErr(true);
            });
    };
    console.log(checkErr);

    return (
        <div className="grid lg:grid-cols-6">
            <div className="col-span-2"></div>
            <Formik
                initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    phone: '',

                    username: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Please fill out this field'),
                    phone: Yup.string()
                        .matches(/^[0-9]+$/, 'Must be only digits')
                        .min(9, 'Must be exactly 10 digits')
                        .max(9, 'Must be exactly 10 digits')
                        .required('Please fill out this field'),
                    firstName: Yup.string().required(
                        'Please fill out this field',
                    ),
                    lastName: Yup.string().required(
                        'Please fill out this field',
                    ),
                    username: Yup.string().required(
                        'Please fill out this field',
                    ),
                    password: Yup.string()
                        .min(6, 'Passwords must be at least 6 characters')
                        .required('Please fill out this field'),
                    confirmPassword: Yup.string()
                        .min(6, 'Passwords must be at least 6 characters')
                        .required('Please fill out this field')
                        .oneOf(
                            [Yup.ref('password'), null],
                            'Passwords must match',
                        ),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    signUpUser(values);
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <div className="mt-12 col-span-2 border-2 border-gray-300 h-[970px]  ">
                        <div className="text-center">
                            <p className="mt-7 text-3xl font-bold">Register</p>
                        </div>

                        <Form>
                            <div className="w-[300px] mx-auto">
                                <div className="mt-5 ">
                                    <label className="font-semibold ">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <div className="mt-2">
                                            <Field
                                                className="w-[298.66px] h-10 bg-gray-100 relative z-10"
                                                type="text"
                                                name="email"
                                                placeholder="bob"
                                            />
                                        </div>
                                        <div className="mt-1 text-red-500">
                                            <ErrorMessage name="email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 ">
                                    <label className="font-semibold ">
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <div className="mt-2">
                                            <Field
                                                className="w-[298.66px] h-10 bg-gray-100 relative z-10"
                                                type="number"
                                                name="phone"
                                                placeholder="bob"
                                            />
                                        </div>
                                        <div className="mt-1 text-red-500">
                                            <ErrorMessage name="phone" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 ">
                                    <label className="font-semibold ">
                                        Fist name
                                    </label>
                                    <div className="mt-2">
                                        <div className="mt-2">
                                            <Field
                                                className="w-[298.66px] h-10 bg-gray-100 relative z-10"
                                                type="text"
                                                name="firstName"
                                                placeholder="bob"
                                            />
                                        </div>
                                        <div className="mt-1 text-red-500">
                                            <ErrorMessage name="firstName" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 ">
                                    <label className="font-semibold ">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <div className="mt-2">
                                            <Field
                                                className="w-[298.66px] h-10 bg-gray-100 relative z-10"
                                                type="text"
                                                name="lastName"
                                                placeholder="bob"
                                            />
                                        </div>
                                        <div className="mt-1 text-red-500">
                                            <ErrorMessage name="lastName" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 ">
                                    <label className="font-semibold ">
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

                                <div className="mt-5 ">
                                    <label
                                        className="font-semibold"
                                        htmlFor="confirmPassword"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="mt-2">
                                        <div className="mt-2">
                                            <Field
                                                className="w-[298.66px] h-10 bg-gray-100  relative z-10"
                                                name="confirmPassword"
                                                placeholder="
                                                    Please enter a confirm password"
                                            />
                                        </div>
                                        <div className="mt-1 text-red-500">
                                            <ErrorMessage name="confirmPassword" />
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
                                    {checkErr && (
                                        <div>
                                            <span className="text-red-500">
                                                Username is already in use!
                                                Please choose another!
                                            </span>
                                        </div>
                                    )}
                                    <button
                                        className="mt-5 bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700 relative z-10"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign up
                                    </button>

                                    <div className="mt-5 text-black/60">
                                        <span>
                                            Already have an account?
                                            <a
                                                href="/login"
                                                className="text-blue-500 ml-1"
                                            >
                                                Login here
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>

            <div className="col-span-2"></div>
        </div>
    );
}

export default Register;
