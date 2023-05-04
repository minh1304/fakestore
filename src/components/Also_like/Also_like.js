import { useEffect, useState } from 'react';
import config from '~/config';
import { Link, useParams } from 'react-router-dom';
import { PauseIcon, PlayIcon } from '../Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from '../Card';
import axios from 'axios';

// export const DataAlbum = createContext();

function Also_like({ data, name, state_load }) {
    const [loading, setLoading] = useState(state_load);
    const list = [];
    const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetch(`https://weak-puce-sawfish-boot.cyclic.app/api/v1/products/category/${data}`)
        //     .then((categories) => categories.json())
        //     .then((categories) => {
        //         setCategories(categories);
        //         setLoading(true);
        //     })
        //     .catch((err) => console.error(err));
        if (data) {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://weak-puce-sawfish-boot.cyclic.app/api/v1/products/category/${data}`,
                headers: {},
            };

            axios
                .request(config)
                .then((response) => {
                    setCategories(response.data.products);
                    setLoading(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            return;
        }
        setTimeout(() => {
            setLoading(false);
        }, 5 * 1000);
    }, [data, name]);

    categories.map((category) => {
        if (category._id === name) {
            console.log('Bằng rồi');
        } else list.push(category);
    });
    console.log('list còn lại: ', list);
    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 ">
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
