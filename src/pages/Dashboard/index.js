import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { Link } from 'react-router-dom';
import config from '~/config';
function Dashboard() {
    const user = useSelector(selectUser);
    const token = user.data.token;
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [countPage, setCountPage] = useState(1);
    const dispatch = useDispatch();
    const handlePage = (e) => {
        e.preventDefault();
        setPage(e.target.textContent);
    };
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const handleOpen = () => {};

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/v1/auth/admin/products`,
            headers: {
                'x-access-token': token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                if (response.data.products.length % 4 === 0) {
                    setCountPage(response.data.products.length / 4);
                } else {
                    setCountPage(
                        parseInt(response.data.products.length / 4) + 1,
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);
    console.log(countPage);

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:3000/api/v1/auth/admin/products?page=${page}`,
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
    }, [page, token]);

    const arrPage = [];
    for (let index = 1; index <= countPage; index++) {
        arrPage.push(index);
    }
    console.log(arrPage);

    if (products.length !== 0) {
        console.log('products là:', products);
    }

    return (
        <div>
            <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10 relative">
                <div className="xl:col-span-1"></div>
                <div className="xl:col-span-10 2xl:col-span-10">
                    <div className="col-span-1 ml-5">
                        <p className="text-xl font-bold">Products</p>
                        <Link to={config.routes.addProduct}>
                            <div
                                // onClick={handleOpen}
                                className="mt-5 border-2 rounded-md w-[200px] hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                            >
                                <p className="p-3">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span> Add new product</span>
                                </p>
                                
                            </div>
                        </Link>
                        <hr className="mt-5 mb-5"></hr>
                        {products.map((product) => (
                            <div key={product._id}>
                                <h2>{product.title}</h2>
                                <hr className="mt-5 mb-5"></hr>
                            </div>
                        ))}
                        <div className="flex w-[200px] ml-52">
                            {arrPage.map((page) => (
                                <button
                                    onClick={(e, page) => {
                                        e.preventDefault();
                                        handlePage(e);
                                    }}
                                    className="m-auto w-[20px]"
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1"></div>
            </div>
        </div>
    );
}

export default Dashboard;
