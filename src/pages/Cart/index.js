import {
    faDollarSign,
    faHome,
    faTrashCan,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '~/context/CartProvider';
function Cart() {
    const { itemAmount, cart, total, removeFromCart } = useContext(CartContext);
    console.log(cart);

    return (
        <div className="bg-white grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <div className="grid grid-cols-10 fixed w-[850px] bottom-0 z-10 shadow-2xl bg-white">
                    <div className="col-span-7 p-5">
                        <p className="text-2xl font-semibold">Total: </p>
                    </div>
                    <div className="text-2xl font-semibold col-span-3 p-5">
                        <div className="flex ml-8">
                            <div className='flex w-[150px]'>
                                <p className="ml-5 pr-2">
                                    <FontAwesomeIcon icon={faDollarSign} />
                                </p>
                                <p>{Math.round(total * 100) / 100}</p>
                            </div>

                            <div className="ml-2 w-[40px] h-[40px] hover:text-primary duration-200 text-center rounded">
                                <FontAwesomeIcon className='' icon={faTrashCan} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 h-[37px] flex">
                    <Link to={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[10px] cursor-pointer hover:text-primary "
                            icon={faHome}
                        />
                    </Link>
                    <h2 className="pt-[6px]">/ Cart</h2>
                </div>
                <section>
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
                                {cart.map((item) => (
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
                                                    <p>{item.amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div
                                                className="h-[50px] relative"
                                                onClick={() =>
                                                    removeFromCart(item.id)
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
                                                    {item.price * item.amount}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h2>Địa chỉ vận chuyển </h2>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
}

export default Cart;
