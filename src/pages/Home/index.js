import { useContext } from 'react';
import Card from '~/components/Card';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

function Home() {
    const { data } = useContext(Data);
    return (
        <div className="bg-white grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <img
                    src="https://cdn.dribbble.com/users/1849236/screenshots/6223889/ecommerce_1_4x.jpg"
                    alt="img"
                />
                <section>
                    <div className="grid grid-cols-4 bg-zinc-300">
                        {data.map((card, index) => (
                            <Card data={card} key={index} />
                        ))}
                    </div>
                </section>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}

export default Home;
