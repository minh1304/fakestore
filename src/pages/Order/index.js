import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import ListOrder from '~/components/ListOrder';
import { selectOrders } from '~/features/orderSlice';

function Order() {
    const user = useSelector(selectUser);
    const [data, setData] = useState([]);
    const [updateCount, setUpdateCount] = useState(0);

    const handleUpdateCount = () => {
        setUpdateCount(updateCount + 1);
    };
    useEffect(() => {
        if (user) {
            const token = user.data.token;
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://weak-puce-sawfish-boot.cyclic.app/api/v1/order',
                headers: {
                    'x-access-token': token,
                },
            };
            axios
                .request(config)
                .then((response) => {
                    setData(response.data.products);
                    // alert('Update Success')
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, updateCount]);

    console.log('all order là: ', data);
    return (
        <div>
            <p className="text-xl font-bold">Orders</p>
            {data.map((test1, index) => (
                <ListOrder
                    key={index}
                    data={test1}
                    onUpdate={handleUpdateCount}
                />
                // <div key={index}>{test1.name}</div>
            ))}
        </div>
    );
}

export default Order;
