import { useContext, useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { CartContext } from '~/context/CartProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card';

// export const DataAlbum = createContext();

function Also_like({ data, name }) {
    const list = [];
    console.log(name);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/category/${data}`)
            .then((categories) => categories.json())
            .then((categories) => {
                // categories.splice(test2,1)
                setCategories(categories);
            })
            .catch((err) => console.error(err));
    }, [data]);
    console.log(categories);
    categories.map((category) => {
        if (category.id === parseInt(name)) console.log('xóa đi');
        else list.push(category);
    });
    console.log(list);
    return (
        <div className='grid grid-cols-4'>
            {list.map((item, index) => (
                <Card id={index }data={item} />
            ))}
        </div>
    );
}

export default Also_like;
