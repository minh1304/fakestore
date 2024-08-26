import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import ProductsList from './ProductsList';

function Dashboard() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const token = user;
    const [products, setProducts] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState(1);

    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await axios.get('https://fakestoresinglecontainer.azurewebsites.net/api/Product', {
                    headers: { 'x-access-token': token },
                });
                const totalProducts = response.data.length; // Adjusted to response.data.length
                setCountPage(Math.ceil(totalProducts / 5)); // Page size set to 5
            } catch (error) {
                console.error('Failed to fetch product count:', error);
            }
        };

        fetchProductCount();
    }, [token, updateCount]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://fakestoresinglecontainer.azurewebsites.net/api/Product?PageNumber=${page}&PageSize=5`, {
                    headers: { 'x-access-token': token },
                });
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [page, token, updateCount]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= countPage) {
            setPage(newPage);
        }
    };

    const handleDelete = async (id) => {
        console.log(token);
        const userConfirmed = window.confirm("Are you sure you want to delete this Product?");
        
        if (!userConfirmed) {
            return navigate('/dashboard');
        }
        try {
            const response = await axios.patch(
                `https://fakestoresinglecontainer.azurewebsites.net/api/admin/deleteProduct/${id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response) 
            {
                setUpdateCount(prev => prev + 1);
                alert('Product deleted successfully!');
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const pageNumbers = Array.from({ length: countPage }, (_, i) => i + 1);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex flex-col lg:flex-row">
                <aside className="lg:w-1/4 p-4 bg-white shadow-md rounded-md mb-4 lg:mb-0">
                    <p className="text-xl font-bold mb-4">Products</p>
                    <Link to={config.routes.addCategory}>
                        <div className="mb-4 p-3 border-2 border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            <span>Add new Category</span>
                        </div>
                    </Link>
                    <Link to={config.routes.addProduct}>
                        <div className="mb-4 p-3 border-2 border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            <span>Add new Product</span>
                        </div>
                    </Link>
                    <Link to={config.routes.trashProduct}>
                        <div className="flex items-center hidden">
                            <FontAwesomeIcon icon={faTrashCan} className="mr-2" />
                            <span>Trash</span>
                        </div>
                    </Link>
                </aside>
                <main className="lg:w-3/4 p-4">
                    <div className="bg-white shadow-md rounded-md p-4">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductsList
                                    key={product._id}
                                    product={product}
                                    handleDelete={handleDelete}
                                />
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                        <div className="flex justify-center mt-4">
                            {pageNumbers.map(num => (
                                <button
                                    key={num}
                                    onClick={() => handlePageChange(num)}
                                    className={`px-3 py-1 border rounded-md mx-1 ${num === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
