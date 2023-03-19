import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '~/app/userSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <div className="h-[82px] bg-black flex overflow-hidden">
            <div className="h-[82px] ml-[-37px] text-center">
                <img
                    className="w-[100px] md:ml-16 mt-2"
                    src="https://seeklogo.com/images/O/off-white-virgilabloh-logo-766416FD87-seeklogo.com.png"
                    alt="logo"
                />
            </div>
            <div className="ml-5 translate-y-7 flex">
                <span>
                    <FontAwesomeIcon
                        className="text-white text-xl"
                        icon={faUser}
                    />
                </span>
                <span className="ml-3 text-white font-bold">Admin</span>
                <div className="ml-3 w-[130px]">
                    <div
                        className=" h-[28px] text-white relative group cursor-pointer"
                        onClick={() => handleLogout()}
                    >
                        <FontAwesomeIcon
                            className="text-white absolute top-1 left-0"
                            icon={faRightFromBracket}
                        />
                        <p className="absolute top-0 group-hover:left-10 left-40 transition-all bg-white  text-black w-[85px] rounded-md overflow-hidden">
                            <span className="p-2">Log out</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
