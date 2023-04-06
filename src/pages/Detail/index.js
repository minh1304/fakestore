import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import {
    faCartShopping,
    faHome,
    faStar as anotherStart,
} from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Also_like from '~/components/Also_like';
import LoadingSkeleton from '~/components/LoadingSkeleton';
import { addToCart } from '~/features/cartSlice';
import * as productApi from '~/apiServices/productApi';
import axios from 'axios';

function Detail() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [rate, setRate] = useState();
    const [count, setCount] = useState();
    const { name } = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            // const detailProduct = await productApi.geDetailProduct({
            //     name: name,
            // });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/v1/products/${name}`,
                headers: {},
            };

            axios
                .request(config)
                .then((response) => {
                    // console.log(response);
                    setData(response.data.product);
                    setRate(response.data.product.rating.rate);
                    setCount(response.data.product.rating.rate);
                    setLoading(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchApi();
        setTimeout(() => {
            setLoading(false);
        }, 5 * 1000);
    }, [name]);
    const arrRate = [];
    const arrRate2 = [];
    for (let i = 1; i < Math.floor(rate) + 1; i++) {
        arrRate.push(i);
    }
    const test = 5 - Math.floor(rate);
    for (let i = 1; i < test; i++) {
        arrRate2.push(i);
    }
    const dispatch = useDispatch();
    const handleAddToCart = (data) => {
        const action = addToCart(data);
        console.log({ action });
        dispatch(action);
    };

    return (
        <div className="bg-white  xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10  2xl:col-span-10">
                <div className="bg-gray-200 h-[37px] flex ">
                    <p>
                        <Link to={'/'}>
                            <FontAwesomeIcon
                                className="pl-3 pr-2 lg:pt-[8px] pt-[10px] cursor-pointer hover:text-primary "
                                icon={faHome}
                            />
                        </Link>
                    </p>
                    <div className="flex">
                        <h2 className="lg:pt-[6px] pt-[7px] pr-1 font-semibold">
                            /
                        </h2>
                        <Link to={`/categories/${data.category}`}>
                            <h2 className="lg:pt-[6px] pt-[7px] pr-1 font-semibold uppercase hover:text-primary ">
                                {data.category}
                            </h2>
                        </Link>
                    </div>
                    <h2 className="lg:pt-[6px] lg:pr-1 pt-[7px] lg:pl-0 pr-0 pl-1 font-semibold">
                        /
                    </h2>
                </div>

                <div className="mt-10 mb-7">
                    <div className="grid md:grid-cols-3">
                        <div className="col-span-1 lg:mx-auto ml-5">
                            {loading && (
                                <LoadingSkeleton className="w-[260px] h-[400px] rounded-md" />
                            )}
                            {!loading && (
                                <img
                                    className="w-[300px]"
                                    src={data.image}
                                    alt="detail"
                                />
                            )}
                        </div>
                        <div className="col-span-1 lg:mx-auto ml-5 lg:mt-0 mt-3">
                            {loading && (
                                <LoadingSkeleton className="w-[256px] h-[30px]" />
                            )}
                            {!loading && (
                                <div className="text-black text-2xl font-medium">
                                    {data.title}
                                </div>
                            )}
                            <div className="pt-2 lg:mt-0 mt-3">
                                {loading && (
                                    <LoadingSkeleton className="w-[160px] h-[20px]" />
                                )}
                            </div>

                            {!loading && (
                                <div className="pt-2 flex">
                                    <h2 className="pr-2 font-medium text-black">
                                        {rate}
                                    </h2>
                                    <p>
                                        {arrRate.map((arr) => (
                                            <FontAwesomeIcon
                                                key={arr}
                                                icon={anotherStart}
                                                className="text-yellow-300"
                                            />
                                        ))}
                                        {rate / Math.floor(rate) !== 1 ? (
                                            <FontAwesomeIcon
                                                icon={faStarHalfStroke}
                                                className="text-yellow-300"
                                            />
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="text-yellow-300"
                                            />
                                        )}
                                        {arrRate2.map((arr) => (
                                            <FontAwesomeIcon
                                                key={arr}
                                                icon={faStar}
                                                className="text-yellow-300"
                                            />
                                        ))}
                                    </p>
                                    <h2 className="pl-2 font-medium text-black">
                                        ({count})
                                    </h2>
                                </div>
                            )}
                            <div>
                                <div className="pt-2 lg:mt-0 mt-3">
                                    {loading && (
                                        <LoadingSkeleton className="w-[160px] h-[50px] rounded-md" />
                                    )}
                                </div>
                                {!loading && (
                                    <div
                                        className="relative z-[10] mt-3 pl-5 flex items-center h-[50px] w-[160px] border-2 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                                        onClick={() => handleAddToCart(data)}
                                    >
                                        <p className="pr-3 font-semibold">
                                            Add to cart
                                        </p>
                                        <span>
                                            <FontAwesomeIcon
                                                icon={faCartShopping}
                                            />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-span-1 ml-5 pr-10  lg:mt-0 mt-3 ">
                            {loading && (
                                <LoadingSkeleton className="w-[160px] h-[30px]" />
                            )}
                            {!loading && (
                                <div className="text-black text-2xl font-medium ">
                                    Description
                                </div>
                            )}
                            {/* <div>
                            {loading && (
                                <LoadingSkeleton className="w-[160px] h-[30px]" />
                            )}
                            <div/> */}
                            {loading && (
                                <div>
                                    <div className="pt-2">
                                        <LoadingSkeleton className="w-[130px] h-[20px]" />
                                    </div>
                                    <div className="pt-2">
                                        <LoadingSkeleton className="w-[350px] h-[20px]" />
                                    </div>
                                    <div className="pt-2">
                                        <LoadingSkeleton className="w-[350px] h-[20px]" />
                                    </div>
                                    <div className="pt-2">
                                        <LoadingSkeleton className="w-[350px] h-[20px]" />
                                    </div>
                                    <div className="pt-2">
                                        <LoadingSkeleton className="w-[350px] h-[20px]" />
                                    </div>
                                    <div className="pt-2">
                                        <LoadingSkeleton className="w-[350px] h-[20px]" />
                                    </div>
                                </div>
                            )}
                            {!loading && (
                                <div className="pt-2">
                                    <div className="flex">
                                        <p className="text-back pr-3">
                                            Category:{' '}
                                        </p>
                                        <Link
                                            className="relative z-[10]"
                                            to={`/categories/${data.category}`}
                                        >
                                            <p className="uppercase text-primary hover:text-red-500 cursor-pointer">
                                                {data.category}
                                            </p>
                                        </Link>
                                    </div>
                                    <p className="text-black ">
                                        {data.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 h-[37px] flex">
                    <div className="grid grid-cols-10 mt-1">
                        <p className="pl-3 col-span-10 font-bold text-lg">
                            You may also like:
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-white">
                        <div className="mt-[1px]"></div>
                        <Also_like
                            data={data.category}
                            name={name}
                            state_load={loading}
                        />
                    </div>
                </div>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default Detail;
