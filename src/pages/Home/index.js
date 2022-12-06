import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PlayIcon } from '~/components/Icons';
import Card from '~/components/Card';
import { DataMusics } from '~/Layout/DefaultLayout/DefaultLayout';

function Home() {
    const { data } = useContext(DataMusics);
    return (
        <div className="bg-primary overflow-auto h-screen-navbar-player pl-8 pt-8">
            <section>
                <div className="mb-4">
                    <h1>For you</h1>
                </div>
                <div className="grid grid-cols-3 ">
                    {data.map((card, index) => (
                        <Card data={card} key={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
