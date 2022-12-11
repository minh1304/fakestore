import config from '~/config';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';
import Menu from './Menu';
// import { HomeIcon } from '~/components/Icons';
function Sidebar() {
    const { price, setPrice } = useContext(Data);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((res) => setCategories(res));
    }, []);

    return (
        <div className="grid grid-cols-10 h-[82px] bg-black text-white fixed w-full z-10">
            <div className="col-span-2 h-[82px] text-center ">
                <Link className="w-[100px] h-[82px]" to={config.routes.home}>
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
                <h1>Basket</h1>
                <h1>{price}</h1>
            </div>
        </div>
    );
}

export default Sidebar;
