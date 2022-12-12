import { faChevronLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { CartContext } from '~/context/CartProvider';
function Cart() {
    const { itemAmount, cart,total } = useContext(CartContext);
    console.log(cart);

    return (
        // <div className="grid grid-cols-2 bg-primary h-screen-navbar-player-mobile overflow-hidden md:h-screen-navbar-player">
        //     <h1 className="text-white">{itemAmount}</h1>
        //     {cart.map((c, index) => (
        //         <h1 key={index}>{c.title}</h1>
        //     ))}
        // </div>
        <div className="bg-white grid grid-cols-12">
            <div className="col-span-1"></div>
            <div className="col-span-10">
                <div className="bg-gray-200 h-[37px] flex">
                    <a href={'/'}>
                        <FontAwesomeIcon
                            className="pl-3 pr-2 pt-[10px] cursor-pointer hover:text-primary "
                            icon={faHome}
                        />
                    </a>
                    <h2 className="pt-[6px]">/ Information</h2>
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
                        <div className="mt-3 grid grid-cols-2">
                            <div className="col-span-1">
                                {cart.map((item) => (
                                    <div className='grid grid-cols-3 mb-10 border-b-2 border-gray-200 pb-3' >
                                        <div className='col-span-1 w-[100px] min-h-[100px]' > 
                                            <img className='bg-cover' src={item.image} alt='item-img'/>
                                        </div>
                                        <div className='col-span-2 ml-10'>
                                            <p key={item.title} className="text-black">
                                                {item.title}
                                            </p>
                                            <p>{item.amount}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex'>
                                    <p>Total: </p>
                                    <p>{total}</p>
                                </div>
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
