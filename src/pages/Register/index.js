// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout, selectUser, setToken, setUser } from '~/app/userSlice';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//     const [checkErr, setCheckErr] = useState(false);
//     const navigate = useNavigate();
//     const [err, setErr] = useState(false);
//     const signUpUser = (value) => {
//         console.log(value);
//         let data = JSON.stringify({
//             userEmail: value.email,
//             username: value.username,
//             password: value.password,
//             phone: value.phone,
//             name: {
//                 firstname: value.firstName,
//                 lastname: value.lastName,
//             },
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'https://fakestoresinglecontainer.azurewebsites.net/api/auth/register',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             data: data,
//         };

//         axios
//             .request(config)
//             .then((response) => {
//                 console.log(response);
//                 setCheckErr(false);
//                 alert('Register Success!!');
//                 navigate('/login');
//             })
//             .catch((error) => {
//                 console.log(error);
//                 setCheckErr(true);
//             });
//     };
//     console.log(checkErr);

//     return (
//         <div className="grid lg:grid-cols-6">
//             <div className="col-span-2"></div>
//             <Formik
//                 initialValues={{
//                     email: '',
//                     firstName: '',
//                     lastName: '',
//                     phone: '',

//                     username: '',
//                     password: '',
//                     confirmPassword: '',
//                 }}
//                 validationSchema={Yup.object({
//                     email: Yup.string()
//                         .email('Invalid email address')
//                         .required('Please fill out this field'),
//                     phone: Yup.string()
//                         .matches(/^[0-9]+$/, 'Must be only digits')
//                         .min(9, 'Must be exactly 10 digits')
//                         .max(9, 'Must be exactly 10 digits')
//                         .required('Please fill out this field'),
//                     firstName: Yup.string().required(
//                         'Please fill out this field',
//                     ),
//                     lastName: Yup.string().required(
//                         'Please fill out this field',
//                     ),
//                     username: Yup.string().required(
//                         'Please fill out this field',
//                     ),
//                     password: Yup.string()
//                         .min(6, 'Passwords must be at least 6 characters')
//                         .required('Please fill out this field'),
//                     confirmPassword: Yup.string()
//                         .min(6, 'Passwords must be at least 6 characters')
//                         .required('Please fill out this field')
//                         .oneOf(
//                             [Yup.ref('password'), null],
//                             'Passwords must match',
//                         ),
//                 })}
//                 onSubmit={(values, { setSubmitting }) => {
//                     signUpUser(values);
//                     console.log(values);
//                     setSubmitting(false);
//                 }}
//             >
//                 {({ isSubmitting }) => (
//                     <div className="mt-12 col-span-2 border-2 border-gray-300 h-[970px]  ">
//                         <div className="text-center">
//                             <p className="mt-7 text-3xl font-bold">Register</p>
//                         </div>

//                         <Form>
//                             <div className="w-[300px] mx-auto">
//                                 <div className="mt-5 ">
//                                     <label className="font-semibold ">
//                                         Email
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100 relative z-10"
//                                                 type="text"
//                                                 name="email"
//                                                 placeholder="bob"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="email" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-5 ">
//                                     <label className="font-semibold ">
//                                         Phone
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100 relative z-10"
//                                                 type="number"
//                                                 name="phone"
//                                                 placeholder="bob"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="phone" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-5 ">
//                                     <label className="font-semibold ">
//                                         Fist name
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100 relative z-10"
//                                                 type="text"
//                                                 name="firstName"
//                                                 placeholder="bob"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="firstName" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-5 ">
//                                     <label className="font-semibold ">
//                                         Last name
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100 relative z-10"
//                                                 type="text"
//                                                 name="lastName"
//                                                 placeholder="bob"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="lastName" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-5 ">
//                                     <label className="font-semibold ">
//                                         Username
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100 relative z-10"
//                                                 type="text"
//                                                 name="username"
//                                                 placeholder="bob"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="username" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-5 ">
//                                     <label
//                                         className="font-semibold"
//                                         htmlFor="password"
//                                     >
//                                         Password
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100  relative z-10"
//                                                 name="password"
//                                                 placeholder="
//                                                     Please enter a password"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="password" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="mt-5 ">
//                                     <label
//                                         className="font-semibold"
//                                         htmlFor="confirmPassword"
//                                     >
//                                         Confirm Password
//                                     </label>
//                                     <div className="mt-2">
//                                         <div className="mt-2">
//                                             <Field
//                                                 className="w-[298.66px] h-10 bg-gray-100  relative z-10"
//                                                 name="confirmPassword"
//                                                 placeholder="
//                                                     Please enter a confirm password"
//                                             />
//                                         </div>
//                                         <div className="mt-1 text-red-500">
//                                             <ErrorMessage name="confirmPassword" />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {err && (
//                                     <div className="mt-3">
//                                         <p className="text-red-500">
//                                             The user name or password is
//                                             incorrect, please type again
//                                         </p>
//                                     </div>
//                                 )}

//                                 <div className="mt-5 text-center ">
//                                     {checkErr && (
//                                         <div>
//                                             <span className="text-red-500">
//                                                 Username is already in use!
//                                                 Please choose another!
//                                             </span>
//                                         </div>
//                                     )}
//                                     <button
//                                         className="mt-5 bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700 relative z-10"
//                                         type="submit"
//                                         disabled={isSubmitting}
//                                     >
//                                         Sign up
//                                     </button>

//                                     <div className="mt-5 text-black/60">
//                                         <span>
//                                             Already have an account?
//                                             <a
//                                                 href="/login"
//                                                 className="text-blue-500 ml-1"
//                                             >
//                                                 Login here
//                                             </a>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Form>
//                     </div>
//                 )}
//             </Formik>

//             <div className="col-span-2"></div>
//         </div>
//     );
// }

// export default Register;

import { useState } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [checkErr, setCheckErr] = useState(false);
    const navigate = useNavigate();

    const signUpUser = (value) => {
        const data = JSON.stringify({
            userEmail: value.email,
            username: value.username,
            password: value.password,
            phone: value.phone,
            name: {
                firstname: value.firstName,
                lastname: value.lastName,
            },
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://fakestoresinglecontainer.azurewebsites.net/api/auth/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios.request(config)
            .then(() => {
                setCheckErr(false);
                alert('Register Success!!');
                navigate('/login');
            })
            .catch(() => {
                setCheckErr(true);
            });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 relative z-10">
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
                        .min(9, 'Must be exactly 9 digits')
                        .max(9, 'Must be exactly 9 digits')
                        .required('Please fill out this field'),
                    firstName: Yup.string()
                        .required('Please fill out this field'),
                    lastName: Yup.string()
                        .required('Please fill out this field'),
                    username: Yup.string()
                        .required('Please fill out this field'),
                    password: Yup.string()
                        .min(6, 'Passwords must be at least 6 characters')
                        .required('Please fill out this field'),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Please fill out this field'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    signUpUser(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
                        <Form>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <Field
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                        type="text"
                                        name="email"
                                        placeholder="Your email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <Field
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                        type="text"
                                        name="phone"
                                        placeholder="Your phone number"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <Field
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                        />
                                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <Field
                                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                        />
                                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <Field
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <Field
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <Field
                                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                {checkErr && (
                                    <div className="text-red-500 text-sm mt-2">
                                        Username is already in use! Please choose another!
                                    </div>
                                )}
                                <div className="text-center mt-6">
                                    <button
                                        className="bg-red-500 w-full py-2 text-white font-semibold rounded-md hover:bg-red-700 transition ease-in-out duration-200"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-gray-600 mt-4">
                                        Already have an account? 
                                        <a href="/login" className="text-blue-500 ml-1">Login here</a>
                                    </p>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default Register;
