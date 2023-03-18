import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '~/app/userSlice';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    console.log('user ở dashboard: ', user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    // const handleTest = () => [
    //     fetch('https://fakestoreapi.com/products',{
    //         method:"POST",
    //         body:JSON.stringify(
    //             {
    //                 title: 'test product',
    //                 price: 13.5,
    //                 description: 'lorem ipsum set',
    //                 image: 'https://i.pravatar.cc',
    //                 category: 'electronic'
    //             }
    //         )
    //     })
    //         .then(res=>res.json())
    //         .then(json=>console.log(json))
    // ];
    console.log(user);
    return (
        <div>
            {user ? (
                <div>
                    {/* <h3>Có đăng nhập</h3>
                    <div>
                        <button
                            className="bg-black text-white"
                            onClick={() => handleLogout()}
                        >
                            Đăng xuất
                        </button>
                    </div> */}

                    <Header/>
                    
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Dashboard;
