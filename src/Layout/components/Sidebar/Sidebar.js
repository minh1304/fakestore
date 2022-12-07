import config from '~/config';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

import { HomeIcon, LibraryActive, Search } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import { useEffect, useState } from 'react';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

// import { HomeIcon } from '~/components/Icons';
function Sidebar() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => res.json())
            .then((res) => setCategories(res));
    }, []);

    return (
        <div className="grid grid-cols-10 h-[82px] bg-black text-white fixed w-full z-10">
            <div className="col-span-2 h-[82px] text-center ">
                <Link className="w-[100px] h-[82px] " to={config.routes.home}>
                    <img
                        className="w-[100px] md:ml-16 mt-2"
                        src="https://seeklogo.com/images/O/off-white-virgilabloh-logo-766416FD87-seeklogo.com.png"
                        alt="logo"
                    />
                </Link>
            </div>
            <div className="col-span-6 grid grid-cols-4 pt-8">
                {categories.map((category) => (
                    <NavLink
                        to={`/${category}`}
                        className="uppercase col-span-1 w-[170px]"
                    >
                        {category}
                    </NavLink>
                ))}
            </div>
            <div className="col-span-2 pt-8">basket</div>
        </div>
    );
}

export default Sidebar;
