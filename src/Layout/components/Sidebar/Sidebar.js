import config from '~/config';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { CartContext } from '~/context/CartProvider';
import Menu from './Menu';
import * as productApi from '~/apiServices/productApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faBars,
    faBeer,
    faClose,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
// import { HomeIcon } from '~/components/Icons';
function Sidebar() {

    const carts = useSelector((state) => state.allCart);

    const [categories, setCategories] = useState([]);
    useEffect(() => {

        const fetchApi = async () => {
            const categories = await productApi.getCategory();
            setCategories(categories);
        };
        fetchApi();
    }, []);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const total = carts.cart.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        setCount(total);
    }, [carts.cart]);
    const [isMobile, setisMobile] = useState(true);
    let Links = [
        { name: 'HOME', link: '/' },
        { name: 'SERVICE', link: '/' },
        { name: 'ABOUT', link: '/' },
        { name: "BLOG'S", link: '/' },
        { name: 'CONTACT', link: '/' },
    ];
    let [open, setOpen] = useState(false);
    return (
        <div
            className={`shadow-lg w-full fixed top-0 left-0 lg:h-[82px] ${
                open && 'h-[380px]'
            } z-50 overflow-y-hidden`}
        >
            <div className="lg:flex items-center justify-between bg-black text-white px-7">
                <div className="h-[82px] ml-[-37px] text-center">
                    <Link
                        className="w-[100px] h-[82px]"
                        to={config.routes.home}
                    >
                        <img
                            className="w-[100px] lg:ml-16 mt-2"
                            src="https://seeklogo.com/images/O/off-white-virgilabloh-logo-766416FD87-seeklogo.com.png"
                            alt="logo"
                        />
                    </Link>
                </div>

                <ul
                    className={`lg:flex -ml-7 lg:items-center lg:pb-0 pb-12 absolute lg:static lg:bg-black bg-white lg:z-auto z-[-1] w-full lg:w-auto pl-9 transition-all duration-500 ease-in ${
                        open ? 'top-20 ' : 'top-[-490px]'
                    }`}
                >
                    {categories.map((link, index) => (
                        <Menu key={index} data={link} />
                    ))}
                    {/* <Button>Get Started</Button> */}
                </ul>
                <div className="mt-3 flex lg:static absolute right-20 top-[18px]">
                    <Link to={config.routes.login}>
                        <div className="w-10 h-10 text-center cursor-pointer hover:opacity-70 duration-300">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </Link>
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
                                    count >= 10 ? 'left-[6px]' : 'left-[8px]'
                                } text-xs `}
                            >
                                {count}
                            </p>
                        </span>
                    </Link>
                </div>
                <div
                    onClick={() => setOpen(!open)}
                    className="text-3xl absolute right-8 top-6 cursor-pointer lg:hidden"
                >
                    {open ? (
                        <FontAwesomeIcon icon={faClose} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
