import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '~/app/userSlice';
import config from '~/config';
import { clearCart } from '~/features/cartSlice';

function Header({ data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate('/');
    };

    return (
        <header className="bg-black text-white h-20 flex items-center fixed top-0 left-0 w-full z-50">
            <div className="flex items-center w-full max-w-screen-xl mx-auto px-4">
                <div className="flex items-center w-1/4">
                    <Link to={config.routes.dashboard}>
                        <img
                            className="w-24 h-auto"
                            src="https://seeklogo.com/images/O/off-white-virgilabloh-logo-766416FD87-seeklogo.com.png"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="flex items-center justify-end w-3/4 space-x-4">
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon
                            className="text-xl"
                            icon={faUser}
                        />
                        <span className="font-bold">AD: {data.UserName}</span>
                    </div>
                    <button
                        className="relative flex items-center space-x-2 text-white bg-black hover:text-gray-400"
                        onClick={handleLogout}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <span>Log out</span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
