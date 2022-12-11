import Sidebar from '../components/Sidebar';
import { createContext, useEffect, useState } from 'react';

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
    const [price, setPrice] = useState();
    console.log(price);
    return (
        <Data.Provider value={{ data, price, setPrice }}>
            <div className='overflow-y-auto'>
                <Sidebar />
                <div className='mt-[82px] w-full'>
                    {/* <Header /> */}
                    <div>{children}</div>
                </div>
            </div>
        </Data.Provider>
    );
}

export default DefaultLayout;
