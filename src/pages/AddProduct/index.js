import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddProduct() {
    // useEffect(() => {

    // })
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const token = user.data.token;
    const [data, setData] = useState([]);
    // console.log(data);
    const handleAddProduct = (values) => {
        let data = JSON.stringify({
            title: values.title,
            price: values.price,
            description: values.description,
            category: values.category,
            image: values.image,
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://weak-puce-sawfish-boot.cyclic.app/api/v1/auth/admin/product/add',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const ProductSchema = Yup.object().shape({
        title: Yup.string().required('Please enter the product title'),
        price: Yup.number()
            .typeError('Price must be a number')
            .min(0, 'Price must be greater than or equal to 0')
            .required('Please enter the product price'),
        description: Yup.string().required(
            'Please enter the product description',
        ),
        category: Yup.string().required('Please select a product category'),
        image: Yup.string().required('Please enter the product image URL'),
    });
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10">
                <div className="col-span-1 ml-5 flex">
                    <Link to={config.routes.dashboard}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <p className="ml-5 text-xl font-bold">Add product </p>
                    <hr className="mt-5 mb-5"></hr>
                    <div className="ml-10 mt-10">
                        <Formik
                            initialValues={{
                                title: '',
                                price: '',
                                description: '',
                                category: '',
                                image: '',
                            }}
                            validationSchema={ProductSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                handleAddProduct(values);
                                console.log(values);
                                setSubmitting(false);
                            }}
                        >
                            {({ errors, touched, isSubmitting }) => (
                                <div className="w-[full]">
                                    <Form>
                                        <div className="relative translate-x-[50%] left-[-50%]">
                                            <div className="mt-3">
                                                <label htmlFor="title">
                                                    Title:
                                                </label>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        className="bg-gray-200 h-[30px] p-3"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="title"
                                                    component="div"
                                                    className="error text-red-500"
                                                />
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="price">
                                                    Price:
                                                </label>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        id="price"
                                                        name="price"
                                                        className="bg-gray-200 h-[30px] p-3"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="price"
                                                    component="div"
                                                    className="error text-red-500"
                                                />
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="description">
                                                    Description:
                                                </label>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        id="description"
                                                        name="description"
                                                        className="bg-gray-200 h-[30px] p-3"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className="error text-red-500"
                                                />
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="category">
                                                    Category:
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="category"
                                                    name="category"
                                                    // className="bg-gray-200 h-[30px] p-3"
                                                >
                                                    <option value="">
                                                        Select a category
                                                    </option>
                                                    <option value="men's clothing">
                                                        Men's Clothing
                                                    </option>
                                                    <option value="women's clothing">
                                                        Women's Clothing
                                                    </option>
                                                    <option value="electronics">
                                                        Electronics
                                                    </option>
                                                    <option value="jewelery">
                                                        Jewelery
                                                    </option>
                                                </Field>
                                                <ErrorMessage
                                                    name="category"
                                                    component="div"
                                                    className="error text-red-500"
                                                />
                                            </div>

                                            <div className="mt-3">
                                                <label htmlFor="image">
                                                    Image URL:
                                                </label>
                                                <div>
                                                    <Field
                                                        type="text"
                                                        id="image"
                                                        name="image"
                                                        className="bg-gray-200 h-[30px] p-3"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="image"
                                                    component="div"
                                                    className="error text-red-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-20 text-center">
                                            <button
                                                className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                        {/* <div>
                                            <div className="mt-20 text-center ">
                                                <button
                                                    // onClick={handleLogOut}
                                                    className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700"
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div> */}
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default AddProduct;
