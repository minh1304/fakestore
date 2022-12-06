import { useContext } from 'react';
import { DataMusics } from '~/App';
function DetailSong() {
    const { song } = useContext(DataMusics);
    return (
        <div className="md:col-span-1 p-14">
            <h2 className="text-white font-bold">Now playing </h2>
            <h2 className="text-neutral-400 text-2xl min-h-[65px]">
                {song.name}
            </h2>
            <div className=" m-auto mt-10 w-[240px] h-[240px]">
                <img
                    className="w-full rounded-2xl h-[240px] object-cover"
                    src={song.links.images[0].url}
                    alt="avatar"
                />
            </div>
            <div className="flex m-auto items-center w-[240px] mt-7">
                <img
                    className="w-[70px] rounded-full"
                    src={song.links.images[1].url}
                    alt="avatar"
                />
                <span className="text-xl text-white ml-4">{song.author}</span>
            </div>
        </div>
    );
}

export default DetailSong;
