import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import {
    faChevronCircleLeft,
    faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import Card from '~/components/Card';
import LoadingSkeleton from '~/components/LoadingSkeleton';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';

function Home() {
    const { data } = useContext(Data);
    const [loading, setLoading] = useState(true);
    const slides = [
        {
            url: 'https://i.pinimg.com/originals/9b/61/f0/9b61f0f7013658ee8bd2dc5a290d338d.jpg',
        },
        {
            url: 'https://cdn.dribbble.com/users/1849236/screenshots/6223889/ecommerce_1_4x.jpg',
        },
        {
            url: 'https://cdn.dribbble.com/users/1072089/screenshots/14186832/ecommerce-dribble-shot_4x.jpg',
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [active, setActive] = useState(0);
    const pervSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        setActive(newIndex);
    };
    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        setActive(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
        setActive(slideIndex);
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5 * 1000);
        const timer = setTimeout(() => {
            if (currentIndex === 2) {
                setCurrentIndex(0);
                setActive(0)
            } else {
                setCurrentIndex(currentIndex + 1);
                setActive(currentIndex +1)
            }
            // setActive(currentIndex+1);
        }, 3000);
        return () => clearTimeout(timer);
    }, [currentIndex]);
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10 ">
            {/* <div className='2xl:block xl:hidden'>1234</div> */}
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10 ">
                <div className="max-w-[1400px] 2xl:h-[880px] xl:h-[800px] w-full m-auto relative group ">
                    <div
                        style={{
                            backgroundImage: `url(${slides[currentIndex].url})`,
                        }}
                        className="w-full h-full bg-center bg-cover duration-500"
                    ></div>
                    <div
                        onClick={pervSlide}
                        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-4xl p-2  text-white cursor-pointer "
                    >
                        <FontAwesomeIcon icon={faChevronCircleLeft} />
                    </div>
                    <div
                        onClick={nextSlide}
                        className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5  text-4xl p-2 text-white cursor-pointer "
                    >
                        <FontAwesomeIcon icon={faChevronCircleRight} />
                    </div>
                    <div className="absolute flex justify-center left-[50%] translate-x-[-50%] bottom-5 ">
                        {slides.map((slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                                className={`ml-3 text-lg cursor-pointer ${
                                    active === slideIndex && 'text-white'
                                }`}
                            >
                                <FontAwesomeIcon icon={faCircleDot} />
                            </div>
                        ))}
                    </div>
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

export default Home;
