import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import {
    faCartShopping,
    faHome,
    faStar as solidStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Also_like from '~/components/Also_like';
import LoadingSkeleton from '~/components/LoadingSkeleton';
import { addToCart } from '~/features/cartSlice';
import axios from 'axios';

function Detail() {
    const [data, setData] = useState({});
    const [rate, setRate] = useState(0);
    const [count, setCount] = useState(0);
    const { name } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                let config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://fakestoresinglecontainer.azurewebsites.net/api/product/${name}`,
                    headers: {},
                };

                const response = await axios.request(config);
                setData(response.data);
                setRate(response.data.Rating.Rate);
                setCount(response.data.Rating.Count);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [name]);

    const arrRate = Array(Math.floor(rate)).fill(0);
    const emptyStars = 5 - Math.ceil(rate);

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="bg-white xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10">
                <div className="bg-gray-200 h-[37px] flex">
                    <p>
                        <Link to="/">
                            <FontAwesomeIcon
                                className="pl-3 pr-2 lg:pt-[8px] pt-[10px] cursor-pointer hover:text-primary"
                                icon={faHome}
                            />
                        </Link>
                    </p>
                    <div className="flex">
                        <h2 className="lg:pt-[6px] pt-[7px] pr-1 font-semibold">
                            /
                        </h2>
                        <Link to={`/categories/${data.Category}`}>
                            <h2 className="lg:pt-[6px] pt-[7px] pr-1 font-semibold uppercase hover:text-primary">
                                {data.Category}
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
                            {loading ? (
                                <LoadingSkeleton className="w-[260px] h-[400px] rounded-md" />
                            ) : (
                                <img
                                    className="w-[300px]"
                                    src={data.Image}
                                    alt={data.Title}
                                />
                            )}
                        </div>
                        <div className="col-span-1 lg:mx-auto ml-5 lg:mt-0 mt-3">
                            {loading ? (
                                <LoadingSkeleton className="w-[256px] h-[30px]" />
                            ) : (
                                <div className="text-black text-2xl font-medium">
                                    {data.Title}
                                </div>
                            )}
                            <div className="pt-2 lg:mt-0 mt-3">
                                {loading ? (
                                    <LoadingSkeleton className="w-[160px] h-[20px]" />
                                ) : (
                                    <div className="pt-2 flex">
                                        <h2 className="pr-2 font-medium text-black">
                                            {rate.toFixed(1)}
                                        </h2>
                                        <p>
                                            {arrRate.map((_, idx) => (
                                                <FontAwesomeIcon
                                                    key={idx}
                                                    icon={solidStar}
                                                    className="text-yellow-300"
                                                />
                                            ))}
                                            {rate % 1 !== 0 && (
                                                <FontAwesomeIcon
                                                    icon={faStarHalfStroke}
                                                    className="text-yellow-300"
                                                />
                                            )}
                                            {Array(emptyStars)
                                                .fill(0)
                                                .map((_, idx) => (
                                                    <FontAwesomeIcon
                                                        key={idx}
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
                            </div>
                            <div className="pt-2 lg:mt-0 mt-3">
                                {loading ? (
                                    <LoadingSkeleton className="w-[160px] h-[20px]" />
                                ) : (
                                    <div className="text-lg font-semibold text-green-600">
                                        ${data.Price?.toFixed(2)}
                                    </div>
                                )}
                            </div>
                            <div className="pt-1 lg:mt-0 mt-3">
                                {loading ? (
                                    <LoadingSkeleton className="w-[160px] h-[50px] rounded-md" />
                                ) : (
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
                        <div className="col-span-1 ml-5 pr-10 lg:mt-0 mt-3">
                            {loading ? (
                                <LoadingSkeleton className="w-[160px] h-[30px]" />
                            ) : (
                                <div className="text-black text-2xl font-medium">
                                    Description
                                </div>
                            )}
                            {loading ? (
                                <div>
                                    {[...Array(6)].map((_, idx) => (
                                        <div key={idx} className="pt-2">
                                            <LoadingSkeleton className="w-[350px] h-[20px]" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="pt-2">
                                    <div className="flex">
                                        <p className="text-back pr-3">
                                            Category:{' '}
                                        </p>
                                        <Link
                                            className="relative z-[10]"
                                            to={`/categories/${data.Category}`}
                                        >
                                            <p className="uppercase text-primary hover:text-red-500 cursor-pointer">
                                                {data.Category}
                                            </p>
                                        </Link>
                                    </div>
                                    <p className="text-black">
                                        {data.Description}
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
                <div className="bg-white">
                    <div className="mt-[1px]"></div>
                    <Also_like
                        data={data.Category}
                        name={name}
                        state_load={loading}
                    />
                </div>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default Detail;
