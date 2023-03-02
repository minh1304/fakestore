import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
function Advertising({ data }) {
    const test = data.slice(8, 12);
    const test1 = data.slice(4, 8);
    const test2 = data.slice(0, 4);
    const test3 = data.slice(15, 19);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
        }, 3000);
        return () => clearTimeout(timer);
    }, [currentIndex]);
    console.log(test);
    const ads = [
        {
            // 626 417
            i: 0 + currentIndex,
            name: 'Electronics',
            url: 'https://img.freepik.com/premium-vector/technology-future-banner_23-2148756649.jpg',
            test: [...test],
        },
        {
            i: 0 + currentIndex,
            name: 'Jewelry',
            url: 'https://img.lovepik.com/free-template/20210217/bg/a0ad9b85a967c.png_list.jpg',
            test: [...test1],
        },
        {
            i: 1 + currentIndex,
            name: 'Men',
            url: 'https://img.freepik.com/free-vector/promotion-fashion-banner_1188-201.jpg',
            test: [...test2],
        },
        {
            i: 1 + currentIndex,
            name: 'Women',
            url: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/women-fashion-point-banner-template-free-design-0d335c9defb80cc2c5cfd362121d9988_screen.jpg?ts=1638273722',
            test: [...test3],
        },
    ];


    return (
        <div className="grid grid-cols-2">
            {ads.map((ad, index) => (
                <div
                    key={index}
                    className={` col-span-1 duration-500 mt-5 ${
                        index % 2 === 0 ? `pl-0 2xl:w-[636px] xl:w-[533px]` : `pl-[4px]`
                    } ${ad.i % 2 === 0 && 'hidden'} `}
                >
                    <div className="text-black/70 text-2xl mb-2 uppercase">
                        {ad.name}
                    </div>
                    <div className="max-w-[1400px] 2xl:h-[500px] xl:h-[450px] relative group ">
                        <div
                            style={{
                                backgroundImage: `url(${ad.url})`,
                            }}
                            className="w-full h-full bg-center object-cover duration-500"
                        ></div>
                    </div>
                    <div className="max-w-[1400px] 2xl:w-[636px] xl:w-[533px] grid grid-cols-4">
                        {ad.test.map((slide, slideIndex) => (
                            <div key={slideIndex} className="col-span-1">
                                <Link to={`/product/${slide.id}`}>
                                    <div className="bg-white relative m-auto 2xl:h-[230px] 2xl:w-[162px] xl:w-[133px] xl:h-[190px] overflow-y-hidden cursor-pointer">
                                        <div className="absolute top-1 right-8 flex">
                                            <h1>
                                                <span className="ml-1 mr-1">
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                    />
                                                </span>
                                                {slide.price}
                                            </h1>
                                        </div>
                                        <img
                                            className="object-cover p-6"
                                            src={slide.image}
                                            alt="img"
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Link to={`/categories/${ad.test[0].category}`}>
                        <div className="relative left-[45%] bg-gray-400 w-[85px] rounded-lg mb-5 hover:bg-black">
                            <button>
                                <h1 className="m-1 text-white">View more</h1>
                            </button>
                        </div>
                    </Link>
                </div>
            ))}
        </div>

    );
}

export default Advertising;