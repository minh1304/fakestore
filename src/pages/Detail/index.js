import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '~/components/Card';
function Detail() {
    const [data, setData] = useState([]);
    const { name } = useParams();
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
    }, [name]);
    console.log(name);
    return (
        <div className="bg-white grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <div className="bg-gray-200 h-[37px] flex">
                    <a href={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[10px] cursor-pointer hover:text-primary "
                            icon={faChevronLeft}
                        />
                    </a>
                    <h2 className="pt-[6px]">/ {data.title}</h2>
                </div>

                <section className="mt-10">
                    <div className="grid grid-cols-3">
                        <div className="col-span-1">
                            <img
                                className="w-[300px]"
                                src={data.image}
                                alt="detail"
                            />
                        </div>
                        <div className="col-span-1">
                            <h1 className="text-black">Infor nè</h1>
                        </div>
                        <div className="col-span-1">
                            <h1 className="text-black">Description</h1>
                            <div>
                                <a href={`/categories/${data.category}`} className="flex">
                                    <p className="text-back pr-3">Category: </p>
                                    <p className="text-primary hover:text-red-500 cursor-pointer">
                                        {data.category}
                                    </p>
                                </a>
                                <p className="text-black ">
                                    {data.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}

export default Detail;
