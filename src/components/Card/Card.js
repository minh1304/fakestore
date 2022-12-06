import { useContext, useEffect, useState, createContext } from 'react';
import config from '~/config';
import { Link } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { DataMusics } from '~/Layout/DefaultLayout/DefaultLayout';

// export const DataAlbum = createContext();

function Card({ data }) {
    const [onSee, setOnSee] = useState(false);
    const [playing, setPlaying] = useState(false);

    const handleOnHover = () => {
        setOnSee(true);
    };
    const handleOffHover = () => {
        setOnSee(false);
    };
    const [idSong, setIdSong] = useState(0);
    const { handleSetSong, song, pauseTest, setPauseTest } =
        useContext(DataMusics);
    const handlePlaySong = (idSong) => {
        // console.log(keySong);
        setIdSong(idSong);
        handleSetSong(idSong);
        console.log('Lấy đc đang phát là:', idSong);
        if (playing) setPlaying(true);
        setPauseTest(true);
    };
    const handlePauseSong = (idSong) => {
        setIdSong(idSong);
        handleSetSong(idSong);
        console.log('Lấy đc tắt là:', idSong);

        setPlaying(false);
        setPauseTest(false);
    };
    // useEffect(() => {
    //     setIdSong(song.id);
    // }, [song]);
    // console.log(song.id);

    return (
        // <DataAlbum.Provider value={{data}}>
            <div className="flex">
                <a href={`/${data.id}`}>
                    <div
                        className="col-span-1 bg-hover_color h-[80px] relative duration-300 w-[395px] mb-4 rounded hover:bg-hover_2"
                        onMouseOver={handleOnHover}
                        onMouseLeave={handleOffHover}
                    >
                        <div className="flex">
                            <div className="w-[80px] h-[80px] bg-[url('https://i.scdn.co/image/ab676186000010169b8cf21ce09745ada7cea1d7')]">
                                <div className="items-center h-full w-full relative">
                                    <img src={data.thumbnail} alt="img" />
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-between pl-4 pr-4">
                                {/* <Link to={config.routes.home}>
                                                <p>Kan</p>
                                            </Link> */}

                                <h3>{data.name}</h3>

                                {/* {pauseTest && idSong === song.id ? (
                                <div
                                    className="relative cursor-pointer w-[48px] h-[48px] rounded-[500px] pointer-events-auto"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePauseSong(data.id);
                                    }}
                                >
                                    <button className="w-full h-full ">
                                        <span className="bg-color_green flex justify-center h-full items-center">
                                            <span className="top-3 l-3">
                                                <PauseIcon />
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                onSee &&
                                !playing && (
                                    <div
                                        className="relative cursor-pointer w-[48px] h-[48px] rounded-[500px] pointer-events-auto"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePlaySong(data.id);
                                        }}
                                    >
                                        <button className="w-full h-full ">
                                            <span className="bg-color_green flex justify-center h-full items-center">
                                                <span className="top-3 l-3">
                                                    <PlayIcon />
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                )
                            )} */}

                                {/* {onPlay && (
                                        
                                    )} */}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        // </DataAlbum.Provider>
    );
}

export default Card;
