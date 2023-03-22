import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ListOrder from '~/components/ListOrder';
import { selectOrders } from '~/features/orderSlice';

function Order() {
    const orders = useSelector(selectOrders);
    const [data, setData] = useState(orders);
    useEffect(() => {
        setData(orders);
    }, [data, orders]);

    console.log('all order là: ', data);
    return (
        <div>
            <h1>Các order của khách hàng</h1>
            {data.map((test1, index) => (
                <ListOrder key={index} data={test1} />
                // <div key={index}>{test1.name}</div>
            ))}
        </div>
    );
}

export default Order;
