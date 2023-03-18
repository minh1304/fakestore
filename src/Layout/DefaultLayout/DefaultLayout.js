import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';

import * as productApi from '~/apiServices/productApi';
import { useDispatch } from 'react-redux';
import { setProduct } from '~/features/productSlice';

// Initialize Firebase

function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const productResult = await productApi.getProduct();
            dispatch(setProduct(productResult));
            setData(productResult);
        };
        fetchApi();
    }, []);

    return (
        <div>
            {' '}
            {/* <button onClick={handleTest} className='text-black w-10 h-10 bg-red-500'>ahihi</button> */}
            <Sidebar />
            <div className="overflow-y-auto top-0 left-0 bg-white">
                <div className="mt-[82px] max-w-7xl mx-auto">
                    <div>{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
