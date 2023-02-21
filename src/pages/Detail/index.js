import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import {
    faCartShopping,
    faHome,
    faStar as anotherStart,
} from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Also_like from '~/components/Also_like';
import LoadingSkeleton from '~/components/LoadingSkeleton';
import { CartContext } from '~/context/CartProvider';
function Detail() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [rate, setRate] = useState();
    const [count, setCount] = useState();
    const { name } = useParams();
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
                setRate(data.rating.rate);
                setCount(data.rating.count);
                setLoading(true);
            })
            .catch((err) => console.error(err));
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
    return (
        <div className="bg-white  xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10  2xl:col-span-10">
                <div className="bg-gray-200 h-[37px] flex">
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[8px] cursor-pointer hover:text-primary "
                            icon={faHome}
                        />
                    </Link>
                    <div className="flex">
                        <h2 className="pt-[6px] pr-1 font-semibold">/</h2>
                        <Link to={`/categories/${data.category}`}>
                            <h2 className="pt-[6px] pr-1 font-semibold uppercase hover:text-primary ">
                                {data.category}
                            </h2>
                        </Link>
                    </div>
                    <h2 className="pt-[6px] pr-1 font-semibold">/</h2>
                    <h2 className="pt-[6px] font-semibold text-gray-500 ">
                        {' '}
                        {data.title}
                    </h2>
                </div>

                <section className="mt-10 mb-7">
                    <div className="grid grid-cols-3">
                        <div className="col-span-1 mx-auto">
                            {loading && (
                                <LoadingSkeleton className="w-[300px] h-[400px] rounded-md" />
                            )}
                            {!loading && (
                                <img
                                    className="w-[300px]"
                                    src={data.image}
                                    alt="detail"
                                />
                            )}
                        </div>
                        <div className="col-span-1 mx-auto">
                            {loading && (
                                <LoadingSkeleton className="w-[300px] h-[30px]" />
                            )}
                            {!loading && (
                                <div className="text-black text-3xl font-medium">
                                    {data.title}
                                </div>
                            )}
                            <div className="pt-2">
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
                                <div className="pt-2">
                                    {loading && (
                                        <LoadingSkeleton className="w-[160px] h-[50px] rounded-md" />
                                    )}
                                </div>
                                {!loading && (
                                    <div
                                        className="mt-3 pl-5 flex items-center h-[50px] w-[160px] border-2 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                                        onClick={() => addToCart(data, data.id)}
                                    >
                                        <p></p>
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
                        <div className="col-span-1 ml-5 pr-10">
                            {loading && (
                                <LoadingSkeleton className="w-[160px] h-[30px]" />
                            )}
                            {!loading && (
                                <div className="text-black text-2xl">
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
                </section>
                <div className="bg-gray-200 h-[37px] flex">
                    <div className="grid grid-cols-10 mt-1">
                        <p className="pl-3 col-span-10 font-bold text-lg">
                            You may also like:
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-200">
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
