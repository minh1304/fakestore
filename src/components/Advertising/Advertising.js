import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Advertising({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Organize data by category
    const categories = {
        electronics: data.filter(product => product.Category === 'Electronics'),
        jewelery: data.filter(product => product.Category === 'Jewelery'),
        men: data.filter(product => product.Category === 'Men'),
        women: data.filter(product => product.Category === 'Women'),
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentIndex]);

    // Group ads into two groups
    const adGroups = [
        [
            {
                name: 'Electronics',
                url: 'https://img.freepik.com/premium-vector/technology-future-banner_23-2148756649.jpg',
                products: categories.electronics.slice(0, 4),
                category: 'electronics',
            },
            {
                name: 'Jewelry',
                url: 'https://img.lovepik.com/free-template/20210217/bg/a0ad9b85a967c.png_list.jpg',
                products: categories.jewelery.slice(0, 4),
                category: 'jewelery',
            },
        ],
        [
            {
                name: 'Men',
                url: 'https://img.freepik.com/free-vector/promotion-fashion-banner_1188-201.jpg',
                products: categories.men.slice(0, 4),
                category: 'men',
            },
            {
                name: 'Women',
                url: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/women-fashion-point-banner-template-free-design-0d335c9defb80cc2c5cfd362121d9988_screen.jpg?ts=1638273722',
                products: categories.women.slice(0, 4),
                category: 'women',
            },
        ],
    ];

    return (
        <div className="grid md:grid-cols-2 grid-cols-1">
            {adGroups[currentIndex].map((ad, index) => (
                <div
                    key={index}
                    className={`col-span-1 duration-500 md:mt-5 mt-0 ${
                        index % 2 === 0
                            ? `pl-0 2xl:w-[636px] xl:w-[533px]`
                            : `pl-[4px]`
                    } ${ad.products.length === 0 ? 'hidden' : ''}`}
                >
                    <div className="text-black/70 text-2xl mb-2 uppercase">
                        {ad.name}
                    </div>
                    <div className="max-w-[1400px] 2xl:h-[510px] xl:h-[450px] h-[326px] relative group ">
                        <div
                            style={{
                                backgroundImage: `url(${ad.url})`,
                            }}
                            className="w-full h-full bg-center object-cover duration-500"
                        ></div>
                    </div>
                    <div className="max-w-[1400px] 2xl:w-[636px] xl:w-[533px] grid grid-cols-4">
                        {ad.products.map((product, productIndex) => (
                            <div key={productIndex} className="col-span-1">
                                <Link to={`/product/${product.Id}`}>
                                    <div className="bg-white relative m-auto 2xl:h-[230px] 2xl:w-[162px] xl:w-[133px] h-[190px] overflow-y-hidden cursor-pointer">
                                        <div className="absolute top-1 right-8 flex">
                                            <h1>
                                                <span className="ml-1 mr-1">
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                    />
                                                </span>
                                                {product.Price}
                                            </h1>
                                        </div>
                                        <img
                                            className="object-cover p-6"
                                            src={product.Image}
                                            alt={product.Title}
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Link to={`/categories/${ad.category}`}>
                            <div className="relative left-[50%] translate-x-[-50%] bg-gray-400 w-[85px] rounded-lg mb-5 hover:bg-black duration-300">
                                <button>
                                    <h1 className="m-1 text-white">View more</h1>
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Advertising;
