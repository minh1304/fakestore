import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Playing from '../components/Playing';
import { createContext, useEffect, useState } from 'react';

export const DataMusics = createContext();
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
    console.log(data);
    return (
        <DataMusics.Provider 
            value={{ data}}
        >
            <Sidebar />
            <div className="grid md:grid-cols-7">
                
                <div className="md:col-span-6">
                    {/* <Header /> */}
                    <div>{children}</div>
                </div>
            </div>
            {/* <div className="w-[100%]">
                <Playing />
            </div> */}
        </DataMusics.Provider>
    );
}

export default DefaultLayout;
