import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { useNavigate } from 'react-router-dom';


function ListMyOrder({ data, onOrderCancel }) {
    const token = useSelector(selectUser);
    const navigate = useNavigate();


    const cancelOrder = async () => {
        const userConfirmed = window.confirm("Are you sure you want to cancel this order?");
        if (!userConfirmed) {
            return;
        }

        try {
            const response = await axios.post(
                `https://fakestoresinglecontainer.azurewebsites.net/api/User/Order/Cancel/${data.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'  
                    },
                }
            );
            if (response.status === 200) {
                alert('Order cancelled successfully!');
                window.location.reload();
                onOrderCancel(data.id); 
            }
        } catch (error) {
            alert('Failed to cancel order. Please try again.');
            console.error(error);
        }
    };
    const completeOrder = async () => {
        const userConfirmed = window.confirm("Are you sure you want to mark this order as completed?");
        if (!userConfirmed) {
            return;
        }

        try {
            const response = await axios.post(
                `https://fakestoresinglecontainer.azurewebsites.net/api/User/Oder/Update/${data.id}`,
                { status: 'Completed' },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                alert('Order marked as completed successfully!');
                //need change to order completed
                window.location.reload();
            }
        } catch (error) {
            alert('Failed to mark order as completed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="ml-10 mt-10 mb-10 border-2 border-gray-300 p-10 rounded-lg shadow-md bg-white">
            <div className="flex justify-between mb-5">
                <span className="text-lg font-semibold">Order ID: {data.id}</span>
                <span className={`text-lg font-semibold ${data.status !== 'Canceled' ? 'text-green-600' : 'text-red-600'}`}>
                    {data.status}
                </span>
            </div>
            <div className="text-gray-700 mb-3">
                <div><span className="font-semibold">Order Date:</span> {new Date(data.orderDate).toLocaleString()}</div>
                <div><span className="font-semibold">Updated Date:</span> {new Date(data.orderUpdatedDate).toLocaleString()}</div>
                <div><span className="font-semibold">Customer Name:</span> {data.name}</div>
                <div><span className="font-semibold">Phone Number:</span> {data.phoneNumber}</div>
                <div><span className="font-semibold">Address:</span> {data.address}</div>
                {data.note && <div><span className="font-semibold">Note:</span> {data.note}</div>}
            </div>
            <div>
                {data.orderProducts.map((item) => (
                    <div key={item.productId} className="mb-8 flex items-start">
                        <img className="w-24 h-54 object-cover rounded-lg shadow-sm" src={item.image} alt={item.title} />
                        <div className="ml-6">
                            <div className="text-lg font-semibold">{item.title}</div>
                            <div className="text-gray-700">Quantity: {item.quantity}</div>
                            <div className="text-gray-700">Price: ${item.price.toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-lg font-semibold text-right">
                Total: ${data.orderProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </div>
            <div className="text-right mt-5">
                {data.status === 'Shipped' && (
                        <button
                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 mr-3"
                            onClick={completeOrder}
                        >
                            Complete Order
                        </button>
                )}

                {data.status !== 'Completed' && data.status !== 'Canceled'  && (
                    <button
                        className="bg-red-200 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-500"
                        onClick={cancelOrder}
                    >
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
}

export default ListMyOrder;
