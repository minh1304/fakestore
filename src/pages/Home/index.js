import { useContext } from 'react';
import Card from '~/components/Card';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

function Home() {
    const { data } = useContext(Data);
    return (
        <div className="bg-white grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <div className=''>
                    <img
                        src="https://cdn.dribbble.com/users/1849236/screenshots/6223889/ecommerce_1_4x.jpg"
                        alt="img"
                    />
                </div>
                <section>
                    <div className="grid grid-cols-12 bg-gray-200">
                        <div className="col-span-1"></div>
                        <div className="col-span-10">
                            <div className='h-1'></div>
                            <div className="grid grid-cols-4">
                                {data.map((card, index) => (
                                    <Card data={card} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="col-span-1"></div>
                    </div>
                </section>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}

export default Home;
