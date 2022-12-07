import { useContext, useEffect, useState, createContext } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

// export const DataAlbum = createContext();

function Card({ data }) {
    const { name } = useParams();
    const [onSee, setOnSee] = useState(false);
    const [playing, setPlaying] = useState(false);

    const handleOnHover = () => {
        setOnSee(true);
    };
    const handleOffHover = () => {
        setOnSee(false);
    };
    const [idSong, setIdSong] = useState(0);
    const { handleSetSong, song, pauseTest, setPauseTest } = useContext(Data);

    // useEffect(() => {
    //     setIdSong(song.id);
    // }, [song]);
    // console.log(song.id);

    return (
        // <DataAlbum.Provider value={{data}}>
        <div className="flex mt-7">
            <div>
                <div
                    className="grid grid-cols-8 bg-white h-[500px] relative duration-300 w-[345px] hover:bg-hover_2 overflow-y-hidden"
                    onMouseOver={handleOnHover}
                    onMouseLeave={handleOffHover}
                >
                    <div className="col-span-1"></div>
                    <div className="col-span-6">
                        <a href={`/${data.id}`}>
                            <div className="relative h-[350px] w-[245px] overflow-y-hidden">
                                <img
                                    className="object-cover"
                                    src={data.image}
                                    alt="img"
                                />
                            </div>
                        </a>
                        <div className="items-center justify-between pl-4 pr-4">
                            <a href={`/categories/${data.category}`}>
                                <h4 className="pt-2">{data.category}</h4>
                            </a>

                            <a href={`/${data.id}`}>
                                <h3 className="pt-2 h-[60px] overflow-y-hidden">
                                    {data.title}
                                </h3>
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
        </div>
        // </DataAlbum.Provider>
    );
}

export default Card;
