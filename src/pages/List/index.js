import config from '~/config';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '~/components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

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
    console.log(data);
    return (
        <div>
            {/* <div className="grid grid-cols-10">
                <div className="col-span-10 m-auto">
                    <p className="text-black uppercase text-2xl font-bold">
                        {name}
                    </p>
                </div>
            </div> */}
            <div className="bg-white grid grid-cols-12">
                <div className="col-span-1"></div>
                <div className="col-span-10">
                    <div className='bg-gray-200 h-[37px] flex'>
                        <Link to={'/'}>
                            <FontAwesomeIcon
                                className='pl-3 pr-2 pt-[8px] cursor-pointer hover:text-primary '
                                icon={faHome}
                            />
                        </Link>
                        <h2 className="pt-[6px] font-semibold uppercase">/ {name}</h2>
                    </div>
                    <section>
                        <div className="grid grid-cols-12 bg-gray-200">
                            <div className="col-span-1"></div>
                            <div className="col-span-10">
                                <div className="h-0"></div>
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
        </div>
    );
}

export default List;
