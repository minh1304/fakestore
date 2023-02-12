import { useContext, useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { CartContext } from '~/context/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// export const DataAlbum = createContext();

function CardMini({ data }) {
    const { addToCart } = useContext(CartContext);
    const [onSee, setOnSee] = useState(false);
    const handleOnHover = () => {
        setOnSee(true);
    };
    const handleOffHover = () => {
        setOnSee(false);
    };
    return (
        <div className='mb-7'>
            <div className="flex ml-9 mt-7">
                <div
                    className="grid grid-cols-8 bg-white duration-700 h-[450x] w-[250px] overflow-y-hidden rounded-md"
                    onMouseOver={handleOnHover}
                    onMouseLeave={handleOffHover}
                >
                    <div className="col-span-1"></div>
                    <div className={`col-span-6`}>
                        <div className="p-1 flex pb-2">
                            <span className="text-black pr-1 font-medium">
                                {data.rating.rate}
                            </span>
                            <span className="pr-1">
                                <FontAwesomeIcon
                                    className="text-yellow-300"
                                    icon={faStar}
                                />
                            </span>
                            <span className="text-black font-medium">
                                ({data.rating.count})
                            </span>
                            <div
                                className={`left-12 relative w-10 h-10 top-0 opacity-0 rounded bg-primary ${
                                    onSee &&
                                    'opacity-100 duration-150 cursor-pointer'
                                } ${!onSee && 'duration-150'}
                                 `}
                                onClick={() => addToCart(data, data.id)}
                            >
                                <FontAwesomeIcon
                                    className="absolute top-[10px] left-[11px] text-white text-xl"
                                    icon={faPlus}
                                />
                            </div>
                        </div>
                        <div className='h-[0.5px]'></div>
                        <div>
                            <Link to={`/product/${data.id}`} end>
                                <div className="relative m-auto h-[270px] w-[145px] overflow-y-hidden">
                                    <img
                                        className="object-cover"
                                        src={data.image}
                                        alt="img"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div
                            className={`items-center justify-between pl-4 pr-4 ${
                                !onSee && 'transition duration-150'
                            } ${
                                onSee &&
                                'translate-y-[-7px] transition duration-150'
                            }`}
                        >
                            <Link to={`/categories/${data.category}`}>
                                <h4 className="pt-2 hover:text-blue-800">
                                    {data.category}
                                </h4>
                            </Link>

                            <Link to={`/${data.id}`}>
                                <p className="pt-2 max-h-[60px] overflow-y-hidden font-medium">
                                    {data.title}
                                </p>
                                <p className="pt-2 overflow-y-hidden text-lg font-bold flex">
                                    <span className="pr-1">{data.price}</span>
                                    <span>
                                        <FontAwesomeIcon icon={faDollarSign} />
                                    </span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
        </div>
        // </DataAlbum.Provider>
    );
}

export default CardMini;
