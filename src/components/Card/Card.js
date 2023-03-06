import { useContext, useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { CartContext } from '~/context/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDollarSign,
    faPlus,
    faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import LoadingSkeleton from '../LoadingSkeleton';

// export const DataAlbum = createContext();

function Card({ data }) {
    // const { totalItems, setTotalItems } = useContext(CardContext);
    const { addToCart } = useContext(CartContext);
    const [onSee, setOnSee] = useState(false);
    // const [playing, setPlaying] = useState(false);
    const handleOnHover = () => {
        setOnSee(true);
    };
    const handleOffHover = () => {
        setOnSee(false);
    };
    return (
        // <DataAlbum.Provider value={{data}}>

        <div className="mb-[1px] ml-[1px] bg-white overflow-y-hidden">
            {/* <div className='xl:hidden block'>1234</div> */}
            <div className="">
                <div
                    className="duration-700"
                    onMouseOver={handleOnHover}
                    onMouseLeave={handleOffHover}
                >
                    <div className={`col-span-8`}>
                        {/* <div className="p-4 flex pb-2">
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
                        </div>
                        <div
                            className={`2xl:left-64 xl:left-52 left-1 relative w-10 h-10 top-[-30px] opacity-0 rounded bg-primary ${
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
                        <div className="h-[0.5px]"></div>

                        <div>
                            <Link
                                to={`/product/${data.id}`}
                                // onClick={() => window.location.reload(false)}
                                end
                            >
                                <div className="relative m-auto h-[270px] w-[145px] overflow-y-hidden">
                                    <img
                                        className="object-cover"
                                        src={data.image}
                                        alt="img"
                                    />
                                </div>
                            </Link>
                        </div> */}

                        {/* Ẩn lại */}
                        {/* <div
                            className={`items-center justify-between pl-4 pr-4 ${
                                !onSee && 'transition duration-150'
                            } ${
                                onSee &&
                                'translate-y-[-7px] transition duration-150'
                            }`}
                        >
                            <Link to={`/categories/${data.category}`}>
                                <h4 className="pt-2 hover:text-blue-800 uppercase font-semibold text-sm">
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
                        </div> */}

                        <div>
                            <div className="card bg-white overflow-hidden h-[470px] relative group">
                                <div className="z-10 absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-primary bg-opacity-0 group-hover:bg-opacity-70 transition-all"></div>
                                <div className="z-10 h-full absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent"></div>
                                <div className="pt-5 m-auto h-[270px] w-[155px] overflow-y-hidden transition-all group-hover:scale-110">
                                    <img
                                        className="object-cover"
                                        src={data.image}
                                        alt="img"
                                    />
                                </div>

                                <div className="group-hover:bottom-[30px] transition-all absolute -bottom-10 left-0 text-white z-20">
                                    <Link to={`/categories/${data.category}`}>
                                        <p className="ml-3 mb-2 text-sm opacity-80 hover:text-black">
                                            {data.category}
                                        </p>
                                    </Link>
                                    <Link to={`/product/${data.id}`}>
                                        <p className="ml-3 mb-12 text-lg font-bold h-[56px] overflow-hidden opacity-85">
                                            {data.title}
                                        </p>
                                    </Link>
                                    {/* <div
                                        className={`2xl:left-64 xl:left-52 left-1 relative w-10 h-10 top-[-30px] opacity-0 rounded bg-primary ${
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
                                    </div> */}
                                    <div
                                    id='test'
                                        className="ml-3 hover:bg-primary transition-all text-sm font-bold inline-flex rounded-md px-4 py-2 text-center border-2 border-primary cursor-pointer"
                                        onClick={() => addToCart(data, data.id)}
                                    >
                                        
                                        <span>Add to cart</span>
                                        <div className="h-[0.5px]"></div>
                                        <FontAwesomeIcon
                                            className="pl-2 pt-1"
                                            icon={faShoppingCart}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
        </div>
        // </DataAlbum.Provider>
    );
}

const Loading = () => {
    return (
        <div className="mb-[1px] ml-[1px] bg-white overflow-y-hidden h-[358px]">
            <LoadingSkeleton className="w-full h-full" />
        </div>
    );
};
Card.Loading = Loading;
export default Card;
