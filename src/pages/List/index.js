import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon } from '~/components/Icons';
import Card from '~/components/Card';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

function List() {
    const [data, setData] = useState([]);
    const { name } = useParams();
    console.log(name);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
    }, [name]);
    console.log(data);
    return (
        <div className="bg-white grid grid-cols-10">
            <div className="col-span-2"></div>
            <div className="col-span-6">
                {/* <img
                    src="https://cmsv2.yame.vn/uploads/d806db26-a099-4ff9-b921-176bb160f16d/Banner_web_MB_9.12.jpg?quality=80&w=0&h=0"
                    alt="img"
                /> */}
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

export default List;
