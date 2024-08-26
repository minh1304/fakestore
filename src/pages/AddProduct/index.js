import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddProduct() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const token = user;
    
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchApi = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://fakestoresinglecontainer.azurewebsites.net/api/product/categories',
                headers: {},
            };
            axios
                .request(config)
                .then((response) => {
                    setCategories(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchApi();
    }, []);
    console.log(categories);
    const handleAddProduct = (values) => {
        const data = JSON.stringify({
            title: values.title,
            price: values.price,
            description: values.description,
            categoryID: values.category,
            image: values.image,
            //Default
            rating: {
                rate : 4,
                count: 100
            }
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://fakestoresinglecontainer.azurewebsites.net/api/admin/product',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                alert("Added Product Success!")
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
        description: Yup.string().required('Please enter the product description'),
        category: Yup.string().required('Please select a product category'),
        image: Yup.string().url('Invalid URL').required('Please enter the product image URL'),
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-6">
                    <Link to={config.routes.dashboard} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <p className="ml-4 text-xl font-bold">Add Product</p>
                </div>

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
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <Field
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <Field
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <Field
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                                    <Field
                                        as="select"
                                        id="category"
                                        name="category"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                                    <Field
                                        type="text"
                                        id="image"
                                        name="image"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                        onChange={(e) => {
                                            setFieldValue('image', e.target.value);
                                            setImagePreview(e.target.value);
                                        }}
                                    />
                                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                                    {imagePreview && (
                                        <div>
                                            <img
                                                src={imagePreview}
                                                alt="Product Preview"
                                                className="mt-4 w-full h-auto max-h-64 object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="text-center mt-6">
                                    <button
                                        type="submit"
                                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default AddProduct;
