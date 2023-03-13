import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { CartContext } from '~/context/CartProvider';
import Menu from './Menu';
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
    // const { itemAmount } = useContext(CartContext);
    const carts = useSelector(state=> state.allCart)
    // const itemAmount = cart;
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((res) => setCategories(res));
    }, []);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const total = carts.cart.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        setCount(total);
    }, [carts.cart]);
    // console.log("đếm:", count);
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
            className={`shadow-md w-full fixed top-0 left-0 md:h-[82px] ${
                open && 'h-[380px]'
            } z-50 overflow-y-hidden`}
        >
            <div
                className="md:flex items-center justify-between bg-black text-white px-7"
            >
                <div className="h-[82px] ml-[-37px] text-center">
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

                <ul
                    className={`md:flex -ml-7 md:items-center md:pb-0 pb-12 absolute md:static md:bg-black bg-white md:z-auto z-[-1] w-full md:w-auto pl-9 transition-all duration-500 ease-in ${
                        open ? 'top-20 ' : 'top-[-490px]'
                    }`}
                >
                    {categories.map((link, index) => (
                        <Menu key={index} data={link} />
                    ))}
                    {/* <Button>Get Started</Button> */}
                </ul>
                <div className="mt-3 flex md:static absolute right-20 top-[18px]">
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
                                    count >= 10
                                        ? 'left-[6px]'
                                        : 'left-[8px]'
                                } text-xs `}
                            >
                                {count}
                            </p>
                        </span>
                    </Link>
                </div>
                <div
                    onClick={() => setOpen(!open)}
                    className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
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
