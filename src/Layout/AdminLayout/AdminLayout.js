import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { Link } from 'react-router-dom';
import config from '~/config';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminLayout({ children }) {
    const user = useSelector(selectUser);
    const [currentUser, setCurrentUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            console.log(user)
            const token = user; // Assuming the token is inside user.data
            axios.get('https://fakestoresinglecontainer.azurewebsites.net/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` },
            })
            .then((response) => {
                setCurrentUser(response.data.Value);
                setIsAdmin(response.data.Value.Role === 'Admin');
            })
            .catch((error) => {
                console.error(error);
            });
        }
    }, [user]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header data={currentUser} />
            {isAdmin ? (
                <div className="flex flex-1 mt-20">
                    <nav className="w-64 bg-gray-800 text-white p-5">
                        <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
                        <ul>
                            <li className="mb-4 hover:bg-gray-400 cursor-pointer">
                                <Link to={config.routes.dashboard} className='ml-6'>Product</Link>
                            </li>
                            <li className="mb-4 hover:bg-gray-400 cursor-pointer">
                                <Link to={config.routes.order} className='ml-6'>Order</Link>
                            </li>
                            {/* <li className="mb-4 hover:bg-gray-400 cursor-pointer">
                                <Link to={config.routes.adjustUser} className='ml-6'>User</Link>
                            </li> */}
                        </ul>
                    </nav>
                    <main className="flex-1 bg-gray-100 p-6">
                        {children}
                    </main>
                </div>
            ) : (
                <div className="flex items-center justify-center flex-1">
                    <h1 className="text-3xl">Access Denied</h1>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default AdminLayout;
