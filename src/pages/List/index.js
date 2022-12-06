import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon } from '~/components/Icons';
import Card from '~/components/Card';
// import { DataAlbum } from '~/components/Card/Card';

function List() {
    const [data, setData] = useState([]);
    const { name } = useParams(); // get nickname

    useEffect(() => {
        fetch(`http://localhost:8000/for_you/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
    }, []);

    console.log(data);

    return (
        <div className='bg-primary overflow-auto h-screen-navbar-player'>
            <div className="p-8 h-[260px] bg-background-test bg-center bg-cover">
                <h1 className="pt-20 text-8xl font-extrabold">{data.name}</h1>
                <h2 className="text-white text-base font-normal">100,000 monthly listeners</h2>
            </div>
            <div className="bg-primary pl-8 pt-8">
                <section>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                    <div className="grid grid-cols-3 ">
                        <h1>album nè</h1>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default List;
