import { useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
// import { CartContext } from '~/context/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux'
import {
    faDollarSign,
    faPlus,
    faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import LoadingSkeleton from '../LoadingSkeleton';
import { addToCart } from '~/features/cartSlice';

// export const DataAlbum = createContext();

function Card({ data }) {
    const dispatch = useDispatch()
    const handleAddToCart = (data) => {
        console.log(data);
        const action = addToCart(data);
        // console.log({action});
        dispatch(action)
    }
    const [onSee, setOnSee] = useState(false);
    // const [playing, setPlaying] = useState(false);
    const handleOnHover = () => {
        setOnSee(true);
    };
    const handleOffHover = () => {
        setOnSee(false);
    };
    return (
        <div className="mb-[1px] ml-[1px] bg-white overflow-y-hidden">
            <div className="">
                <div
                    className="duration-700"
                    onMouseOver={handleOnHover}
                    onMouseLeave={handleOffHover}
                >
                    <div className={`col-span-8`}>
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
                                        <p className='ml-3 mb-2 text-lg font-bold overflow-hidden opacity-85 text-white hover:text-primary'>{data.price} <FontAwesomeIcon icon={faDollarSign}/> </p>
                                        <p className="ml-3 mb-12 text-lg font-bold h-[56px] overflow-hidden opacity-85 hover:text-primary">
                                            {data.title}
                                        </p>
                                    </Link>
                                    <div
                                    id='test'
                                        className="ml-3 hover:bg-primary transition-all text-sm font-bold inline-flex rounded-md px-4 py-2 text-center border-2 border-primary cursor-pointer"
                                        onClick={()=> handleAddToCart(data)}
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
        <div className="mb-[1px] ml-[1px] bg-white overflow-y-hidden h-[470px]">
            <LoadingSkeleton className="w-full h-full" />
        </div>
    );
};
Card.Loading = Loading;
export default Card;
