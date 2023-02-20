import Sidebar from '../components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import CartProvider from '~/context/CartProvider';

export const Data = createContext();
function DefaultLayout({ children }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <Data.Provider value={{ data }}>
            <CartProvider>
                <div className="overflow-y-auto top-0 left-0 bg-gray-200">
                    <Sidebar />
                    <div className="mt-[82px] max-w-7xl mx-auto">
                        <div>{children}</div>
                    </div>
                </div>
            </CartProvider>
        </Data.Provider>
    );
}

export default DefaultLayout;
