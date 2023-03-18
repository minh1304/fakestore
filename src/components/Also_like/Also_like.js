import { useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card';

// export const DataAlbum = createContext();

function Also_like({ data, name, state_load }) {
    const [loading, setLoading] = useState(state_load);
    const list = [];
    console.log(name);
    const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${data}`)
            .then((categories) => categories.json())
            .then((categories) => {

                setCategories(categories);
                setLoading(true);
            })
            .catch((err) => console.error(err));

        setTimeout(() => {
            setLoading(false);
        }, 5 * 1000);
    }, [data]);
    console.log(categories);
    categories.map((category) => {
        if (category.id === parseInt(name)) console.log('xóa đi');
        else list.push(category);
    });
    console.log(list);
    return (
        <div
            className="grid lg:grid-cols-4 grid-cols-2 "
        >
            {loading &&
                list.map((item, index) => (
                    <Card.Loading id={index} data={item} />
                ))}
            {!loading &&
                list.map((item, index) => <Card id={index} data={item} />)}
        </div>
    );
}

export default Also_like;
