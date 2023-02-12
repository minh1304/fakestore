import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '~/components/Card';

function List() {
    const [data, setData] = useState([]);
    const { name } = useParams();
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
    }, [name]);
    return (
        <div>
            <div className="grid grid-cols-10">
                <div className="col-span-10 m-auto">
                    <p className="text-black uppercase text-2xl font-bold">{name}</p>
                </div>

            </div>
            <div className="bg-white grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    {/* <img
                    src="https://cmsv2.yame.vn/uploads/d806db26-a099-4ff9-b921-176bb160f16d/Banner_web_MB_9.12.jpg?quality=80&w=0&h=0"
                    alt="img"
                /> */}
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
        </div>
    );
}

export default List;
