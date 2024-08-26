import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector(selectUser);

    const [order, setOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://fakestoresinglecontainer.azurewebsites.net/api/Admin/order/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setOrder(response.data);
            } catch (error) {
                console.error('Failed to fetch order details:', error);
            }
        };

        fetchOrderDetails();
    }, [id, token]);

    const handleUpdateOrder = () => {
        if (newStatus === "" || order.status === "Canceled" || order.status === "Completed")
            return;

        const userConfirmed = window.confirm("Are you sure you want to save these changes?");
        if (!userConfirmed) {
            return navigate(-1);
        }

        const data = JSON.stringify({
            id: order.id,
            status: newStatus
        });

        const config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `https://fakestoresinglecontainer.azurewebsites.net/api/admin/UpdateOrderById`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                alert("Order updated successfully!");
                navigate(-1);
            })
            .catch((error) => {
                console.error('Failed to update Order:', error);
            });
    }

    if (!order) {
        return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
    }

    const isOrderUpdatable = order.status !== "Canceled" && order.status !== "Completed";

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full">
                <div className="flex items-center mb-6">
                    <span onClick={() => navigate(-1)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </span>
                    <p className="ml-4 text-xl font-bold">Order Details</p>
                </div>

                <div className="mb-4">
                    <div className="text-lg"><span className="font-semibold">Order ID:</span> {order.id}</div>
                    <div className="text-lg"><span className="font-semibold">Customer Name:</span> {order.name}</div>
                    <div className="text-lg"><span className="font-semibold">Phone Number:</span> {order.phoneNumber}</div>
                    <div className="text-lg"><span className="font-semibold">Address:</span> {order.address}</div>
                    <div className="text-lg"><span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleString()}</div>
                    <div className="text-lg"><span className="font-semibold">Updated Date:</span> {new Date(order.orderUpdatedDate).toLocaleString()}</div>
                    {order.note && <div className="text-lg"><span className="font-semibold">Note:</span> {order.note}</div>}
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Products</h3>
                    {order.orderProducts.map((item) => (
                        <div key={item.productId} className="mb-4 flex items-start border-b pb-4">
                            <img className="w-24 h-24 object-cover rounded-lg shadow-sm" src={item.image} alt={item.title} />
                            <div className="ml-6">
                                <div className="text-lg font-semibold">{item.title}</div>
                                <div className="text-gray-700">Quantity: {item.quantity}</div>
                                <div className="text-gray-700">Price: ${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-lg font-semibold text-right mb-6">
                    Total: ${order.orderProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </div>

                <div className="mb-4">
                    <label className="font-semibold">Order Status:</label>
                    {order.status !== "Canceled" && order.status !== "Completed" ? (
                        <select
                        className={`text-lg font-semibold ${order.status !== 'Canceled' ? 'text-green-600' : 'text-red-600'} ml-2`}
                        value={newStatus || order.status}
                        onChange={(e) => {
                            setNewStatus(e.target.value);
                        }}
                        disabled={!isOrderUpdatable}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                    </select>
                    ): 
                    (
                        <span className=' ml-2 text-lg font-semibold text-red-600'>{order.status}</span>
                    )}

                    
                </div>
                
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        onClick={handleUpdateOrder}
                        className={`bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${!isOrderUpdatable ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isOrderUpdatable}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
