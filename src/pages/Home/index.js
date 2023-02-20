import { useContext } from 'react';
import Card from '~/components/Card';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

function Home() {
    const { data } = useContext(Data);
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10 ">
            {/* <div className='xl:hidden block'>1234</div> */}
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10 ">
                <div className=''>
                    <img
                        src="https://cdn.dribbble.com/users/1849236/screenshots/6223889/ecommerce_1_4x.jpg"
                        alt="img"
                    />
                </div>
                <section>
                    <div className="grid grid-cols-12 bg-gray-200">
                        {/* <div className="col-span-1"></div> */}
                        <div className="col-span-12">
                            <div className='mt-[1px]'></div>
                            <div className="grid grid-cols-4">
                                {data.map((card, index) => (
                                    <Card data={card} key={index} />
                                ))}
                            </div>
                        </div>
                        {/* <div className="col-span-1"></div> */}
                    </div>
                </section>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default Home;
