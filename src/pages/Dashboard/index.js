import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '~/app/userSlice';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    console.log('user ở dashboard: ', user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/')
    };
    console.log(user);
    return (
        <div>
            {user ? (
                <div>
                    <h3>Có đăng nhập</h3>
                    <div>
                        <button
                            className="bg-black text-white"
                            onClick={() => handleLogout()}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Dashboard;
