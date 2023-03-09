import Sidebar from '../components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';

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
                <Sidebar/>
                <div className="overflow-y-auto top-0 left-0 bg-white">
                    <div className="mt-[82px] max-w-7xl mx-auto">
                        <div>{children}</div>
                    </div>
                </div>
                <Footer/>
            </CartProvider>
        </Data.Provider>
    );
}

export default DefaultLayout;
