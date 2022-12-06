import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Playing from '../components/Playing';
import { createContext, useEffect, useState } from 'react';

export const DataMusics = createContext();
function DefaultLayout({ children }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8000/for_you')
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
    }, []);

    // console.log(data);

    // const [song, setSong] = useState([]);

    // const handleSetSong = (idSong) => {
    //     const song = data.find((song) => song.id === idSong);
    //     setSong(song);
    // };
    
    // const [pauseTest, setPauseTest] = useState(false)
    return (
        <DataMusics.Provider 
            value={{ data}}
        >
            <div className="grid md:grid-cols-7">
                <Sidebar />
                <div className="md:col-span-6">
                    <Header />
                    <div>{children}</div>
                </div>
            </div>
            <div className="w-[100%]">
                <Playing />
            </div>
        </DataMusics.Provider>
    );
}

export default DefaultLayout;
