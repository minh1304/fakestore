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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${name}`)
            .then((data) => data.json())
            .then((data) => {
                setData(data);
            })
            .catch((err) => console.error(err));
        setTimeout(() => {
            setLoading(false);
        }, 5 * 1000);
    }, [name]);
    console.log(data);
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10 ">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10 ">
                <div className="bg-gray-200 h-[37px] flex z-20">
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[8px] cursor-pointer hover:text-primary "
                            icon={faHome}
                        />
                    </Link>
                    <h2 className="pt-[6px] font-semibold uppercase">
                        / {name}
                    </h2>
                </div>
                <section>
                    <div className="grid grid-cols-12 bg-gray-200">
                        {/* <div className="col-span-1"></div> */}
                        <div className="col-span-12">
                            <div className="mt-[1px]"></div>
                            <div className="grid grid-cols-4">
                                {loading &&
                                    data.map((card, index) => (
                                        <Card.Loading data={card} key={index} />
                                    ))}
                                {!loading &&
                                    data.map((card, index) => (
                                        <Card data={card} key={index} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default List;
