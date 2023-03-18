import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import {
    faChevronCircleLeft,
    faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Advertising from '~/components/Advertising';
import Card from '~/components/Card';
import LoadingSkeleton from '~/components/LoadingSkeleton';
import Slider from '~/components/Slider';
import { Data } from '~/Layout/DefaultLayout/DefaultLayout';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import { selectProduct } from '~/features/productSlice';

function Home() {

    const [loading, setLoading] = useState(true);
    // const test = useSelector(selectUser)
    // console.log("user nè: ",test);
    const data = useSelector(selectProduct)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5 * 1000);
    }, []);
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10 ">
            {/* <div className='2xl:block xl:hidden'>1234</div> */}
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10 ">
            
                <div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.3 }}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                    >
                        <Slider />
                    </motion.div>
                </div>

                <div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4 }}
                        variants={{
                            // hidden: { opacity: 0, x: 80 },
                            // visible: { opacity: 1, x: 0 },
                            hidden: { opacity: 0, scale: 0.6 },
                            visible: { opacity: 1, scale: 1 },
                        }}
                    >
                        <Advertising data={data} />
                    </motion.div>
                </div>
                <div className="mt-5 mb-2 text-black/70 text-2xl uppercase">
                    All products
                </div>
                <section>
                    <div className="grid grid-cols-12 bg-white">
                        {/* <div className="col-span-1"></div> */}
                        <div className="col-span-12">
                            <div className="mt-[1px]"></div>
                            <div className="grid md:grid-cols-4 grid-cols-2">
                                {loading &&
                                    data.map((card, index) => (
                                        <div>
                                            <Card.Loading
                                                data={card}
                                                key={index}
                                            />
                                        </div>
                                    ))}
                                {!loading &&
                                    data.map((card, index) => (
                                        <div>
                                            <Card data={card} key={index} />
                                        </div>
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
