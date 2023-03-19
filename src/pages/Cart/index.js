import {
    faDollarSign,
    faHome,
    faMinus,
    faPlus,
    faTrashCan,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    clearCart,
    decrease,
    increase,
    removeCart,
} from '~/features/cartSlice';
// import { CartContext } from '~/context/CartProvider';
function Cart() {
    const carts = useSelector((state) => state.allCart);
    const dispath = useDispatch();
    const cart = carts.cart;

    console.log(carts.cart);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const total = carts.cart.reduce((acc, curr) => {
            return acc + curr.amount * curr.price;
        }, 0);
        setTotal(total);
    }, [carts.cart]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const total = carts.cart.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        setCount(total);
    }, [carts.cart]);
    console.log(total);
    const handleRemove = (itemId) => {
        // console.log('remove', item);
        console.log(itemId);
        const action = removeCart(itemId);
        dispath(action);
    };
    const decreaseAmount = (item) => {
        if (item.amount === 1) handleRemove(item.id);
        const action = decrease(item.id);
        dispath(action);
    };
    const increaseAmount = (itemId) => {
        const action = increase(itemId);
        dispath(action);
    };
    const itemAmount = total;
    return (
        <div className="xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10 ">
                <div className="bg-gray-200 h-[37px] flex z-20">
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[10px] cursor-pointer hover:text-primary "
                            icon={faHome}
                        />
                    </Link>
                    <h2 className="pt-[6px]">/ Cart</h2>
                </div>
                <section className="mt-[2px] min-h-[37vh]">
                    {itemAmount === 0 ? (
                        <div className="mt-3 grid grid-cols-3">
                            <div className="col-span-1"></div>
                            <div className="col-span-1">
                                <p className="ml-[150px] text-3xl font-extrabold">
                                    No Item
                                </p>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/3158/3158980.png"
                                    alt="img-noitem"
                                />
                            </div>
                            <div className="col-span-1"></div>
                        </div>
                    ) : (
                        <div className="mt-3 grid grid-cols-3">
                            <div className="col-span-2">
                                {carts.cart.map((item) => (
                                    <div className="grid grid-cols-6 mb-10 border-b-2 border-gray-200 pb-3">
                                        <div className="col-span-1 w-[100px] min-h-[100px]">
                                            <img
                                                className="bg-cover"
                                                src={item.image}
                                                alt="item-img"
                                            />
                                        </div>
                                        <div className="col-span-4 ml-10">
                                            <p
                                                key={item.title}
                                                className="text-black font-bold h-[50px]"
                                            >
                                                {item.title}
                                            </p>
                                            <div className="grid grid-cols-2">
                                                <div className="flex col-span-1">
                                                    <p className="mr-1">
                                                        <FontAwesomeIcon
                                                            className="text-gray-500"
                                                            icon={faDollarSign}
                                                        />
                                                    </p>
                                                    <p className="font-bold text-gray-500">
                                                        {item.price}
                                                    </p>
                                                </div>
                                                <div className="flex col-span-1">
                                                    <p
                                                        className="cursor-pointer w-5 hover:text-primary"
                                                        onClick={() =>
                                                            decreaseAmount(item)
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faMinus}
                                                        />
                                                    </p>
                                                    <p></p>
                                                    <p className="ml-3 mr-3 w-10 text-center border-2">
                                                        {item.amount}
                                                    </p>
                                                    <p
                                                        className="cursor-pointer w-5  hover:text-primary"
                                                        onClick={() =>
                                                            increaseAmount(
                                                                item.id,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                        />
                                                    </p>

                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div
                                                className="h-[50px] relative"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                <p className="h-7 w-7 absolute top-0 right-5 text-center rounded-md text-gray-500 pt-[2px] duration-200 hover:text-primary">
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                    />
                                                </p>
                                            </div>
                                            <div className="flex">
                                                <p className="mr-1">
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                    />
                                                </p>
                                                <p className="font-bold">
                                                    {(item.amount * item.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    {/* <h2>Địa chỉ vận chuyển </h2> */}
                                    {itemAmount > 0 && (
                                        <div className="">
                                            <div className="col-span-7 p-5 flex">
                                                <span className="text-base font-bold">
                                                    Total:
                                                </span>{' '}
                                                <span className="pl-3 pr-2 text-base">
                                                    <FontAwesomeIcon
                                                        icon={faDollarSign}
                                                    />
                                                </span>
                                                <span className="text-base font-bold">
                                                    {parseFloat(
                                                        total.toFixed(2),
                                                    )}
                                                </span>
                                            </div>
                                            {/* <div className="text-xl font-semibold col-span-3 p-5">
                                                <div className="flex ml-8">
                                                    <div className="flex w-[155px]">
                                                        <p className="ml-5 pr-2">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faDollarSign
                                                                }
                                                            />
                                                        </p>
                                                        
                                                        {total}
                                                    </div>

                                                    <div
                                                        className="ml-2 w-[40px] h-[40px] hover:text-primary duration-200 text-center rounded"
                                                        onClick={() =>
                                                            handleClearCart()
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            className=""
                                                            icon={faTrashCan}
                                                        />
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default Cart;
