import { useContext } from 'react';
import Card from '~/components/Card';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

function Home() {
    const { data } = useContext(Data);
    return (
        <div className="bg-white grid grid-cols-10">
            <div className="col-span-2"></div>
            <div className="col-span-6">
                <img
                    src="https://cmsv2.yame.vn/uploads/d806db26-a099-4ff9-b921-176bb160f16d/Banner_web_MB_9.12.jpg?quality=80&w=0&h=0"
                    alt="img"
                />
                <section>
                    <div className="grid grid-cols-3">
                        {data.map((card, index) => (
                            <Card data={card} key={index} />
                        ))}
                    </div>
                </section>
            </div>
            <div className="col-span-2"></div>
        </div>
    );
}

export default Home;
