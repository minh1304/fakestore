import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';

import * as productApi from '~/apiServices/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '~/features/productSlice';
import { clearCount } from '~/features/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
// import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

// Initialize Firebase

function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const test = useSelector((state) => state.allCart.count);
    console.log(test);
    useEffect(() => {
        const fetchApi = async () => {
            const productResult = await productApi.getProduct();
            dispatch(setProduct(productResult));
            setData(productResult);
        };
        fetchApi();
        setTimeout(() => {
            if (test !== 0) {
                dispatch(clearCount());
            }
        }, 3000);
    }, [test]);

    return (
        <div className="">
            <div className={``}>
                <div class={`${test ? 'z-50' : ''} fixed  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bottom-0 right-0 flex items-center justify-center`}>
                    <div
                        class={`bg-black/60 rounded-md p-10 transform transition ${
                            test ? 'scale-1 duration-300' : 'scale-0 duration-200'
                        }  `}
                    >
                        <div>
                            <FontAwesomeIcon
                                className="text-green-500 text-4xl"
                                icon={faCircleCheck}
                            />
                        </div>
                        <div className="text-white text-lg">
                            Product added to cart
                        </div>
                    </div>
                </div>
            </div>

            {/* <div
                    // className={`${
                    //     test
                    //         ? 'fixed top-[50%] left-[50%] z-[100] bg-black/60 h-[150px] w-[300px] rounded-md translate-x-[-50%] translate-y-[-50%]'
                    //         : 'hidden'
                    // }  `}
                    className={` bg-black/60 h-[150px] w-[300px] rounded-md `}
                >
                    <div>
                        <FontAwesomeIcon
                            className="text-green-500 text-4xl absolute left-[50%] -translate-x-[50%] top-[30%]"
                            icon={faCircleCheck}
                        />
                    </div>
                    <div className="text-white text-lg absolute top-[60%] left-[20%]">
                        Product added to cart
                    </div>
                </div> */}

            <Sidebar />
            <div className="overflow-y-auto top-0 left-0 bg-white">
                <div className="mt-[82px] max-w-7xl mx-auto">
                    <div>{children}</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
