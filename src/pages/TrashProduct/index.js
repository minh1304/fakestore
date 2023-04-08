import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '~/app/userSlice';
import config from '~/config';

function TrashProduct() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const token = user.data.token;
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/auth/admin/products/trash',
            headers: {
                'x-access-token': token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);
    console.log(products);
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10">
                <div className="col-span-1 ml-5 flex">
                    <Link to={config.routes.dashboard}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <p className="ml-5 text-xl font-bold">Trash product </p>
                    <hr className="mt-5 mb-5"></hr>
                    <div className="ml-10 mt-10"></div>
                </div>

                {products.map((product) => (
                    <div className="ml-5">
                        <div
                                key={product._id}
                                className="grid grid-cols-10"
                            >
                                <div className="col-span-6 mt-5">
                                    <div className="w-[100px]">
                                        <img src={product.image} />
                                    </div>
                                    <h2 className="mt-5">{product.title}</h2>
                                </div>
                                <div className="col-span-4">
                                    <div>
                                        <span
                                            // onClick={() =>
                                            //     handleDelete(product._id)
                                            // }
                                            className="mr-3 hover:text-red-500 cursor-pointer"
                                        >
                                            <FontAwesomeIcon
                                                // icon={faTrashCan}
                                            />
                                        </span>
                                    </div>
                                </div>
                                {/* <hr className="mt-5 mb-5"></hr> */}
                                <div className="bg-opacity-0 opacity-[0]">
                                    a
                                </div>
                            </div>
                    </div>
                ))}
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}
export default TrashProduct;
