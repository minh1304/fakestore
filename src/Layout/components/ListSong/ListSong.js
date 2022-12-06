import { faBars, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { DataMusics } from '~/App';

function ListSong() {
    const { Data, handleSetSong, song } = useContext(DataMusics);
    const [idSong, setIdSong] = useState(0);
    const handlePlaySong = (idSong) => {
        setIdSong(idSong);
        handleSetSong(idSong);
    };
    useEffect(() => {
        setIdSong(song.id);
    }, [song]);
    const [openList, setOpenList] = useState(false);
    const handleOpen = () => {
        if (openList) {
            setOpenList(false);
        } else {
            setOpenList(true);
        }
    };
    return (
        <div
            className={`md:block md:col-span-2 p-11 overflow-y-scroll md:mt-0 md:ml-0 mt-[-615px] ml-[0px] z-50`}
        >
            <div className="block fixed ml-[-35px] md:hidden">
                <FontAwesomeIcon
                    className="text-3xl text-white"
                    icon={faBars}
                    onClick={handleOpen}
                />
            </div>
            <div>
                <table
                    className={`${
                        openList ? '' : 'hidden'
                    } md:block table-auto w-full`}
                >
                    <thead className="text-white h-12">
                        <tr>
                            <th className="w-[10%]">#</th>
                            <th className="text-left">Play List</th>
                            <th className="hidden md:mt-3 md:ml-[90px] md:block md:w-[10%]">
                                Author
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-200 bg-white md:bg-none ">
                        {Data.map((song, index) => (
                            <tr
                                key={index}
                                className={`bg-color_header h-12 text-neutral-400 duration-300 ease-in-out hover:hover ${
                                    idSong === song.id &&
                                    'bg-slate-50 hover:noneHover text-black'
                                }`}
                                onClick={() => {
                                    handlePlaySong(song.id);
                                    setOpenList(false);
                                }}
                                onMouseOver={() => console.log("ahihi")}
                            >
                                <td className="text-center">{index + 1}</td>
                                <td>{song.name}</td>
                                <td className="hidden md:block md:text-center">
                                    {song.author}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListSong;
