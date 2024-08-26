import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { Link } from 'react-router-dom';
import config from '~/config';

function Order() {
    const user = useSelector(selectUser);
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const [orderDateFrom, setOrderDateFrom] = useState('');
    const [orderDateEnd, setOrderDateEnd] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const statusOptions = [
        { value: '', label: 'All' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Processing', label: 'Processing' },
        { value: 'Shipped', label: 'Shipped' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Canceled', label: 'Canceled' }
    ];

    useEffect(() => {
        const today = new Date();
        const pastDate = new Date();

        today.setDate(today.getDate() + 1);
        pastDate.setDate(today.getDate() - 30);

        setOrderDateFrom(pastDate.toISOString().split('T')[0]);
        setOrderDateEnd(today.toISOString().split('T')[0]);
    }, []);

    const handleSearch = async () => {
        if (user) {
            setLoading(true);
            try {
                const response = await axios.post('https://fakestoresinglecontainer.azurewebsites.net/api/Admin/getOrderByStatus', {
                    searchText,
                    status,
                    orderDateFrom,
                    orderDateEnd,
                    pageSize,
                    pageIndex
                }, {
                    headers: {
                        'Authorization': `Bearer ${user}`,
                        'Content-Type': 'application/json'
                    }
                });

                const { orders, totalCount } = response.data;

                setOrders(orders);
                setTotalPages(Math.ceil(totalCount / pageSize));  // Calculate the total number of pages
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        handleSearch();
    }, [orderDateFrom, orderDateEnd, pageSize, pageIndex, status]);

    const handlePageChange = (newPageIndex) => {
        if (newPageIndex >= 1 && newPageIndex <= totalPages) {
            setPageIndex(newPageIndex);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">All Orders</h1>

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Search Orders</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Order ID"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="date"
                        value={orderDateFrom}   
                        onChange={(e) => setOrderDateFrom(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    />
                    <input
                        type="date"
                        value={orderDateEnd}
                        onChange={(e) => setOrderDateEnd(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg w-full mb-4"
                    />
                    <button
                        onClick={() => {
                            setPageIndex(1); // Reset to first page on search
                            handleSearch(); // Trigger search
                        }}
                        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">No orders found.</p>
                ) : (
                    <>
                        {orders.map((order) => (
                            <div key={order.id} className="mb-6 border border-gray-300 p-4 rounded-lg shadow-sm bg-white">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <div className="text-lg font-semibold">Order ID: {order.id}</div>
                                        <div className="text-gray-700">User: {order.name}</div>
                                        <div className="text-gray-700">Total Price: ${order.orderProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</div>
                                        <div className="text-gray-700">Date: {new Date(order.orderDate).toLocaleString()}</div>
                                        <div className="text-gray-700">Order Status: <span className={` ${order.status !== 'Canceled' ? 'text-green-600' : 'text-red-600'}`}> {order.status} </span></div>
                                    </div>
                                    <Link to={config.routes.orderDetail.replace(':id', order.id)}>
                                        <button className="mb-4 p-3 border-2 border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition duration-200 cursor-pointer flex items-center">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => handlePageChange(pageIndex - 1)}
                                disabled={pageIndex === 1}
                                className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <div>Page {pageIndex} of {totalPages}</div>
                            <button
                                onClick={() => handlePageChange(pageIndex + 1)}
                                disabled={pageIndex === totalPages}
                                className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Order;
