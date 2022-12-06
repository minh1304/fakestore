import config from '~/config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

import { HomeIcon, LibraryActive, Search } from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import { useState } from 'react';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

// import { HomeIcon } from '~/components/Icons';
function Sidebar() {
    const [isNavMenuMobileOpen, setIsNavMenuMobileOpen] = useState(false);
    const handleOpenMenu = () => {
        if (!isNavMenuMobileOpen) {
            setIsNavMenuMobileOpen(true);
        } else {
            setIsNavMenuMobileOpen(false);
        }
    };
    return (
        <aside className="h-[100px] md:h-full md:col-span-1 z-[100] bg-black ">
            <div className="w-full">
                <div className="grid grid-cols-2 md:block text-white p-8">
                    <div className="col-span-1">
                        <Link
                            to={config.routes.home}
                            className="items-center text-3xl md: flex"
                        >
                            <FontAwesomeIcon
                                className="text-5xl"
                                icon={faSpotify}
                            />
                            <span className="font-semibold text-3xl pl-2">
                                Spotify
                            </span>
                        </Link>
                    </div>
                    <div className="col-span-1">
                        <div
                            className="block ml-[170px] mt-5 md:hidden"
                            onClick={handleOpenMenu}
                        >
                            <FontAwesomeIcon
                                className="text-3xl"
                                icon={faEllipsisVertical}
                            />
                        </div>
                        <div
                            className={`${
                                isNavMenuMobileOpen ? ' ' : 'hidden'
                            } rounded-2xl bg-black  md:border-none  md:block md:ml-[1px] pt-5 font-semibold mt-5`}
                        >
                            <Menu>
                                <MenuItem
                                    to={config.routes.home}
                                    title="Home"
                                    icon={<HomeIcon />}
                                />
                                <MenuItem
                                    to={config.routes.search}
                                    title="Search"
                                    icon={<Search />}
                                />
                                <MenuItem
                                    to={config.routes.library}
                                    title="Your Library"
                                    icon={<LibraryActive />}
                                />
                            </Menu>
                        </div>
                    </div>
                </div>
                {/* <div className="col-span-1 w-[0px]"></div> */}
            </div>
        </aside>
    );
}

export default Sidebar;
