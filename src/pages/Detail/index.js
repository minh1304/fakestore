import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';
import {
    faCartShopping,
    faStar as anotherStart,
} from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '~/context/CartProvider';
function Detail() {
    const [data, setData] = useState([]);
    const [rate, setRate] = useState();
    const [count, setCount] = useState();
    const { name } = useParams();
    const { addToCart } = useContext(CartContext);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
                setRate(data.rating.rate);
                setCount(data.rating.count);
            })
            .catch((err) => console.error(err));
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
    // const count =  data.rating;

    return (
        <div className="bg-white grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <div className="bg-gray-200 h-[37px] flex">
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[10px] cursor-pointer hover:text-primary "
                            icon={faChevronLeft}
                        />
                    </Link>
                    <h2 className="pt-[6px]">/ {data.title}</h2>
                </div>

                <section className="mt-10">
                    <div className="grid grid-cols-3">
                        <div className="col-span-1">
                            <img
                                className="w-[300px]"
                                src={data.image}
                                alt="detail"
                            />
                        </div>
                        <div className="col-span-1">
                            <div className="text-black text-3xl font-medium">
                                {data.title}
                            </div>

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
                            <div>
                                <div
                                    className="mt-3 pl-5 flex items-center h-[50px] w-[160px] border-2 rounded-md cursor-pointer hover:bg-primary hover:text-white"
                                    onClick={() => addToCart(data, data.id)}
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
                            </div>
                        </div>
                        <div className="col-span-1 ml-5">
                            <div className="text-black text-2xl">
                                Description
                            </div>
                            <div className="pt-2">
                                <div className="flex">
                                    <p className="text-back pr-3">Category: </p>
                                    <Link to={`/categories/${data.category}`}>
                                        <p className="text-primary hover:text-red-500 cursor-pointer">
                                            {data.category}
                                        </p>
                                    </Link>
                                </div>
                                <p className="text-black ">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}

export default Detail;
