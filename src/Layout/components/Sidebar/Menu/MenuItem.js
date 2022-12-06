import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function MenuItem({ title, to, icon, activeIcon, on }) {
    return (
        <div className="mb-3 flex items-center">
            <NavLink
                // className="flex items-center text-decorative transition duration-300 ease-in-out hover:text-white"
                className={(navData) =>
                    navData.isActive
                        ? 'navData flex items-center text-white transition duration-300 ease-in-out]'
                        : 'flex items-center text-decorative transition duration-300 ease-in-out hover:text-white'
                }
                to={to}
            >
                <span className={'mb-[2px]'}>{icon}</span>
                {/* <span className={'mb-[2px]'}>{activeIcon}</span> */}
                <span className="pl-5 font-bold">{title}</span>
            </NavLink>
        </div>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItem;
