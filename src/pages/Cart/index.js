import {
    faDollarSign,
    faHome,
    faMinus,
    faPlus,
    faTrashCan,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    clearCart,
    decrease,
    increase,
    purchased,
    removeCart,
} from '~/features/cartSlice';

import { addOrder } from '~/features/orderSlice';
import axios from 'axios';
import { selectUser } from '~/app/userSlice';
// import { CartContext } from '~/context/CartProvider';
function Cart() {
    const carts = useSelector((state) => state.allCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = carts.cart;

    console.log('cart nè test...:, phải làm sao phải làm sao  ', carts.cart);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const total = carts.cart.reduce((acc, curr) => {
            return acc + curr.amount * curr.price;
        }, 0);
        setTotal(total);
    }, [carts.cart]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const total = carts.cart.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        setCount(total);
    }, [carts.cart]);
    console.log(total);
    const handleRemove = (itemId) => {
        // console.log('remove', item);
        console.log(itemId);
        const action = removeCart(itemId);
        dispatch(action);
    };
    const decreaseAmount = (item) => {
        if (item.amount === 1) handleRemove(item.Id);
        const action = decrease(item.Id);
        dispatch(action);
    };
    const increaseAmount = (itemId) => {
        console.log(itemId);
        const action = increase(itemId);
        dispatch(action);
    };
    const itemAmount = total;

    //call api get information current user
    const [currentUser, setCurrentUser] = useState({});
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user) {
            const token = user;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://fakestoresinglecontainer.azurewebsites.net/api/auth/me',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
        } else {
            console.log('User không đăng nhập');
        }
    }, [user]);


    const handleSubmit = (values) => {
        const token = user;
        if (user != null) {
            const products = carts.cart.map(item => ({
                productId: item.Id,
                quantity: item.amount
            }));
        
            const orderData = {
                phoneNumber: values.phoneNumber,
                address: values.address,
                note: values.note,
                name: values.name,
                products: products
            };
        
            console.log("Order Data:", orderData); // Log order data to check its structure
        
            let config = {
                method: 'post',
                url: 'https://fakestoresinglecontainer.azurewebsites.net/api/user/order',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                data: orderData 
            };
        
            axios.request(config)
                .then((response) => {
                    console.log("Response Data:", response.data); 
                    dispatch(clearCart());
                    navigate('/login');
                })
                .catch((error) => {
                    console.error("Request Error:", error.response ? error.response.data : error.message); 
                });
        
                dispatch(addOrder(orderData));
                alert('Order added!!');
        } else {
            alert('Please log in to place an order');
        }
        
    };
    return (
        <div className="xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10 ">
                <div className="bg-gray-200 h-[37px] flex z-20">
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[10px] cursor-pointer hover:text-primary "
                            icon={faHome}
                        />
                    </Link>
                    <h2 className="pt-[6px]">/ Cart</h2>
                </div>
                <section className="mt-[2px] min-h-[37vh]">
                    {itemAmount === 0 ? (
                        <div className="mt-3 grid grid-cols-3">
                            <div className="col-span-1"></div>
                            <div className="col-span-1">
                                <p className="ml-[150px] text-3xl font-extrabold">
                                    No Item
                                </p>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3158/3158980.png"
                                    alt="img-noitem"
                                />
                            </div>
                            <div className="col-span-1"></div>
                        </div>
                    ) : (
                        <div className="mt-3 grid lg:grid-cols-3 ">
                            <div className="lg:col-span-2">
                                {carts.cart.map((item) => (
                                    <div className="grid grid-cols-6 mb-10 border-b-2 border-gray-200 pb-3 relative z-10">
                                        <div className="col-span-1 w-[100px] min-h-[100px]">
                                            <img
                                                className="bg-cover"
                                                src={item.Image}
                                                alt="item-img"
                                            />
                                        </div>
                                        <div className="col-span-4 ml-10">
                                            <p
                                                key={item.Title}
                                                className="text-black font-bold h-[50px]"
                                            >
                                                {item.Title}
                                            </p>
                                            <div className="grid grid-cols-2">
                                                <div className="flex col-span-1">
                                                    <p className="mr-1">
                                                        <FontAwesomeIcon
                                                            className="text-gray-500"
                                                            icon={faDollarSign}
                                                        />
                                                    </p>
                                                    <p className="font-bold text-gray-500">
                                                        {item.Price}
                                                    </p>
                                                </div>
                                                <div className="flex col-span-1">
                                                    <p
                                                        className="cursor-pointer w-5 hover:text-primary"
                                                        onClick={() =>
                                                            decreaseAmount(item)
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                        />
                                                    </p>
                                                    <p></p>
                                                    <p className="ml-3 mr-3 w-10 text-center border-2">
                                                        {item.amount}
                                                    </p>
                                                    <p
                                                        className="cursor-pointer w-5  hover:text-primary"
                                                        onClick={() =>
                                                            increaseAmount(
                                                                item.Id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                        />
                                                    </p>

                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div
                                                className="h-[50px] relative"
                                                onClick={() =>
                                                    handleRemove(item.Id)
                                                }
                                            >
                                                <p className="h-7 w-7 absolute top-0 right-5 text-center rounded-md text-gray-500 pt-[2px] duration-200 hover:text-primary">
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                    />
                                                </p>
                                            </div>
                                            <div className="flex">
                                                <p className="mr-1">
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                    />
                                                </p>
                                                <p className="font-bold">
                                                    {(
                                                        item.amount * item.Price
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    {/* <h2>Địa chỉ vận chuyển </h2> */}
                                    {itemAmount > 0 && (
                                        <div className="">
                                            <div className="col-span-7 p-5 flex">
                                                <span className="text-base font-bold">
                                                    Total:
                                                </span>{' '}
                                                <span className="pl-3 pr-2 text-base">
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                    />
                                                </span>
                                                <span className="text-base font-bold">
                                                    {parseFloat(
                                                        total.toFixed(2),
                                                    )}
                                                </span>
                                            </div>
                                            {/* <div className="text-xl font-semibold col-span-3 p-5">
                                                <div className="flex ml-8">
                                                    <div className="flex w-[155px]">
                                                        <p className="ml-5 pr-2">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faDollarSign
                                                                }
                                                            />
                                                        </p>
                                                        
                                                        {total}
                                                    </div>

                                                    <div
                                                        className="ml-2 w-[40px] h-[40px] hover:text-primary duration-200 text-center rounded"
                                                        onClick={() =>
                                                            handleClearCart()
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className=""
                                                            icon={faTrashCan}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="lg:col-span-1 lg:ml-3 relative left-[50%] translate-x-[-50%]  w-[310px] h-[630px] border-2 p-3 pb-3">
                                <p className="text-xl font-bold">
                                    Your address
                                </p>
                                <div>
                                    <Formik
                                        initialValues={{
                                            name: '',
                                            address: '',
                                            phoneNumber: ' ',
                                            note: ' ',
                                        }}
                                        validationSchema={Yup.object({
                                            name: Yup.string().required(
                                                'Name is required',
                                            ),
                                            address: Yup.string().required(
                                                'Address is required',
                                            ),
                                            phoneNumber: Yup.string()
                                                .required(
                                                    'Phone number is required',
                                                )
                                                .matches(
                                                    /^\d{10}$/,
                                                    'Phone number must be 10 digits',
                                                ),
                                        })}
                                        onSubmit={(
                                            values,
                                            { setSubmitting },
                                        ) => {
                                            handleSubmit(values);
                                            setSubmitting(false);
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <Form>
                                                {/* Name */}
                                                <div className="mt-5">
                                                    <label
                                                        className="font-semibold"
                                                        htmlFor="name"
                                                    >
                                                        Name:
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="mt-2">
                                                            <Field
                                                                className="p-2 w-[280px] h-10 border-2 relative z-10"
                                                                id="name"
                                                                name="name"
                                                                placeholder="Nguyen Van A"
                                                            />
                                                        </div>
                                                        <div className="mt-1 text-red-500">
                                                            {' '}
                                                            <ErrorMessage name="name" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Phone */}
                                                <div className="mt-5">
                                                    <label
                                                        className="font-semibold"
                                                        htmlFor="phoneNumber"
                                                    >
                                                        Phone number:
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="mt-2">
                                                            <Field
                                                                className="p-2 w-[280px] h-10 border-2 relative z-10"
                                                                id="phoneNumber"
                                                                name="phoneNumber"
                                                                placeholder="0123456789"
                                                            />
                                                        </div>
                                                        <div className="mt-1 text-red-500">
                                                            {' '}
                                                            <ErrorMessage name="phoneNumber" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Address */}
                                                <div className="mt-5">
                                                    <label
                                                        className="font-semibold"
                                                        htmlFor="address"
                                                    >
                                                        Address:
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="mt-2">
                                                            <Field
                                                                className="p-2 w-[280px] h-10 border-2 relative z-10"
                                                                id="address"
                                                                name="address"
                                                                placeholder="Enter your address"
                                                            />
                                                        </div>
                                                        <div className="mt-1 text-red-500">
                                                            <ErrorMessage name="address" />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* note */}
                                                <div className="mt-5">
                                                    <label
                                                        className="font-semibold"
                                                        htmlFor="note"
                                                    >
                                                        Note:
                                                    </label>
                                                    <div className="mt-2">
                                                        <div className="mt-2 ">
                                                            <Field
                                                                className="p-2 h-20 w-[280px] border-2 relative z-10"
                                                                id="note"
                                                                name="note"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* submit */}
                                                <div className="mt-5 absolute left-[50%] translate-x-[-50%]">
                                                    <button
                                                        className="bg-red-500 w-[100px] h-[40px] text-white font-semibold rounded-md hover:bg-red-700 relative z-10"
                                                        type="submit"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default Cart;
