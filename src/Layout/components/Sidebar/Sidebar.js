import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '~/context/CartProvider';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser } from '@fortawesome/free-solid-svg-icons';
// import { HomeIcon } from '~/components/Icons';
function Sidebar() {
    const { itemAmount } = useContext(CartContext);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((res) => setCategories(res));
    }, []);
    return (
        <div className="h-auto">
            <div className="grid grid-cols-10 h-[82px] bg-black text-white fixed w-full z-10">
                <div className="col-span-2 h-[82px] text-center ">
                    <Link
                        className="w-[100px] h-[82px]"
                        to={config.routes.home}
                    >
                        <img
                            className="w-[100px] md:ml-16 mt-2"
                            src="https://seeklogo.com/images/O/off-white-virgilabloh-logo-766416FD87-seeklogo.com.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="col-span-6 grid grid-cols-4 pt-8">
                    {categories.map((category, index) => (
                        <Menu key={index} data={category} />
                    ))}
                </div>
                <div className="col-span-2 pt-8 flex">
                    <div className="w-10 h-10 text-center cursor-pointer hover:opacity-70 duration-300">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <Link
                        // onClick={() => console.log('mở giỏ hàng ')}
                        to={config.routes.cart}
                        className="ml-2 w-10 h-15 text-center cursor-pointer flex hover:opacity-70 duration-300"
                    >
                        <span>
                            <FontAwesomeIcon icon={faBagShopping} />
                        </span>
                        <span className="relative top-3 left-0 w-[25px] h-[25px] bg-primary overflow-y-hidden rounded-full">
                            <p
                                className={`absolute top-[5px] ${
                                    itemAmount >= 10
                                        ? 'left-[6px]'
                                        : 'left-[8px]'
                                } text-xs `}
                            >
                                {itemAmount}
                            </p>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
