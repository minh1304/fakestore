import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

function AddCategory() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const token = user;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://fakestoresinglecontainer.azurewebsites.net/api/product/categories', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };
        fetchCategories();
    }, [token]);

    const handleAddCategory = async (values, { setSubmitting, resetForm }) => {
        // Construct the payload as per the API schema
        const payload = {
            name: values.name,
            products: values.products.map(product => ({
                title: product.title,
                price: parseFloat(product.price),
                description: product.description,
                image: product.image,
                rating: {
                    rate: parseFloat(product.rating.rate),
                    count: parseInt(product.rating.count, 10),
                },
            })),
        };

        // Confirmation popup
        const userConfirmed = window.confirm("Are you sure you want to add this category and its products?");
        if (!userConfirmed) {
            setSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('https://fakestoresinglecontainer.azurewebsites.net/api/admin/categories', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                },
            });
            alert("Category and Products Added Successfully!");
            resetForm();
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to add category:', error);
            alert("Failed to add category. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Please enter the category name'),
        products: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('Please enter the product title'),
                price: Yup.number()
                    .typeError('Price must be a number')
                    .min(0, 'Price must be greater than or equal to 0')
                    .required('Please enter the product price'),
                description: Yup.string().required('Please enter the product description'),
                image: Yup.string().url('Invalid URL').required('Please enter the product image URL'),
                rating: Yup.object().shape({
                    rate: Yup.number()
                        .typeError('Rate must be a number')
                        .min(0, 'Rate must be between 0 and 5')
                        .max(5, 'Rate must be between 0 and 5')
                        .required('Please enter the rating'),
                    count: Yup.number()
                        .typeError('Count must be a number')
                        .min(0, 'Count must be greater than or equal to 0')
                        .required('Please enter the rating count'),
                }),
            })
        ).min(1, 'At least one product is required'),
    });

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-6">
                    <Link to={config.routes.dashboard} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <p className="ml-4 text-xl font-bold">Add New Category</p>
                </div>

                <Formik
                    initialValues={{
                        name: '',
                        products: [
                            {
                                title: '',
                                price: '',
                                description: '',
                                image: '',
                                rating: {
                                    rate: '',
                                    count: '',
                                },
                            },
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddCategory}
                >
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="space-y-6">
                                {/* Category Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                {/* Products */}
                                <FieldArray name="products">
                                    {({ push, remove }) => (
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-lg font-semibold">Products</h2>
                                                <button
                                                    type="button"
                                                    onClick={() => push({
                                                        title: '',
                                                        price: '',
                                                        description: '',
                                                        image: '',
                                                        rating: {
                                                            rate: '',
                                                            count: '',
                                                        },
                                                    })}
                                                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                                >
                                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                    Add Product
                                                </button>
                                            </div>
                                            {values.products.map((product, index) => (
                                                <div key={index} className="border border-gray-300 p-4 rounded-md mb-4">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <h3 className="text-md font-medium">Product {index + 1}</h3>
                                                        {values.products.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                className="text-red-500 hover:text-red-700 focus:outline-none"
                                                            >
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        )}
                                                    </div>

                                                    {/* Product Title */}
                                                    <div className="mb-4">
                                                        <label htmlFor={`products.${index}.title`} className="block text-sm font-medium text-gray-700">Title</label>
                                                        <Field
                                                            type="text"
                                                            id={`products.${index}.title`}
                                                            name={`products.${index}.title`}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                                        />
                                                        <ErrorMessage name={`products.${index}.title`} component="div" className="text-red-500 text-sm mt-1" />
                                                    </div>

                                                    {/* Product Price */}
                                                    <div className="mb-4">
                                                        <label htmlFor={`products.${index}.price`} className="block text-sm font-medium text-gray-700">Price</label>
                                                        <Field
                                                            type="number"
                                                            step="0.01"
                                                            id={`products.${index}.price`}
                                                            name={`products.${index}.price`}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                                        />
                                                        <ErrorMessage name={`products.${index}.price`} component="div" className="text-red-500 text-sm mt-1" />
                                                    </div>

                                                    {/* Product Description */}
                                                    <div className="mb-4">
                                                        <label htmlFor={`products.${index}.description`} className="block text-sm font-medium text-gray-700">Description</label>
                                                        <Field
                                                            as="textarea"
                                                            id={`products.${index}.description`}
                                                            name={`products.${index}.description`}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                                            rows="3"
                                                        />
                                                        <ErrorMessage name={`products.${index}.description`} component="div" className="text-red-500 text-sm mt-1" />
                                                    </div>

                                                    {/* Product Image URL */}
                                                    <div className="mb-4">
                                                        <label htmlFor={`products.${index}.image`} className="block text-sm font-medium text-gray-700">Image URL</label>
                                                        <Field
                                                            type="text"
                                                            id={`products.${index}.image`}
                                                            name={`products.${index}.image`}
                                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                                            onChange={(e) => {
                                                                setFieldValue(`products.${index}.image`, e.target.value);
                                                                // Optionally, you can manage separate image previews for each product
                                                            }}
                                                        />
                                                        <ErrorMessage name={`products.${index}.image`} component="div" className="text-red-500 text-sm mt-1" />
                                                        {values.products[index].image && (
                                                            <div className="mt-2">
                                                                <img
                                                                    src={values.products[index].image}
                                                                    alt={`Product ${index + 1} Preview`}
                                                                    className="w-full h-auto max-h-64 object-contain border border-gray-200 rounded-md"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = '/images/placeholder.png';
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Rating */}
                                                    <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                                                        <div className="grid grid-cols-2 gap-4 mt-1">
                                                            {/* Rate */}
                                                            <div>
                                                                <label htmlFor={`products.${index}.rating.rate`} className="block text-sm font-medium text-gray-700">Rate</label>
                                                                <Field
                                                                    type="number"
                                                                    step="0.1"
                                                                    id={`products.${index}.rating.rate`}
                                                                    name={`products.${index}.rating.rate`}
                                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                                                />
                                                                <ErrorMessage name={`products.${index}.rating.rate`} component="div" className="text-red-500 text-sm mt-1" />
                                                            </div>

                                                            {/* Count */}
                                                            <div>
                                                                <label htmlFor={`products.${index}.rating.count`} className="block text-sm font-medium text-gray-700">Count</label>
                                                                <Field
                                                                    type="number"
                                                                    id={`products.${index}.rating.count`}
                                                                    name={`products.${index}.rating.count`}
                                                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                                                                />
                                                                <ErrorMessage name={`products.${index}.rating.count`} component="div" className="text-red-500 text-sm mt-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Add Category'}
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

export default AddCategory;
