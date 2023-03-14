import Sidebar from '../components/Sidebar';
import { createContext, useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import { store } from '~/app/store';

import * as productApi from '~/apiServices/productApi'

export const Data = createContext();
function DefaultLayout({ children }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const productResult = await productApi.getProduct()
            setData(productResult)
        }
        fetchApi()
    }, []);
    return (
        <Data.Provider value={{ data }}>
            <Provider store={store}>
                <Sidebar />
                <div className="overflow-y-auto top-0 left-0 bg-white">
                    <div className="mt-[82px] max-w-7xl mx-auto">
                        <div>{children}</div>
                    </div>
                </div>
                <Footer />
            </Provider>
        </Data.Provider>
    );
}

export default DefaultLayout;
