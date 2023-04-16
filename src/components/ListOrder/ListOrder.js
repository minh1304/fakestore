import {
    faCircleCheck,
    faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';

function ListOrder({ data, onUpdate }) {
    const user = useSelector(selectUser);
    const [isPending, setIsPending] = useState(data.status);
    const [isReject, setIsReject] = useState(false);
    useEffect(() => {
        setIsPending(data.status);
    }, [data]);
    console.log(isPending);
    const handleAllow = (id) => {
        if (user) {
            const token = user.data.token;
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/v1/auth/admin/${id}/order`,
                headers: {
                    'x-access-token': token,
                },
            };
            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    onUpdate();
                    alert('Success');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleReject = (id) => {
        setIsReject(true);
        if (isReject) {
            const token = user.data.token;
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/api/v1/auth/admin/${id}/reject`,
                headers: {
                    'x-access-token': token,
                },
            };

            axios
                .request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    onUpdate();
                    alert('Rejected Success!');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className="mt-10 min-h-[300px] border-2 p-5">
            {isPending === 'Processing' && (
                <div className="flex">
                    <div
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleAllow(data._id)}
                    >
                        <FontAwesomeIcon className="h-8" icon={faCircleCheck} />
                    </div>
                    <div
                        className="text-red-500 ml-10 cursor-pointer"
                        onClick={() => handleReject(data._id)}
                    >
                        <FontAwesomeIcon className="h-8" icon={faCircleXmark} />
                    </div>
                </div>
            )}
            {isPending === "Rejected"  && (
                <div>
                    <p className='text-red-500 font-bold text-2xl'>Order Rejected</p>
                </div>
            )}
            <div className="mt-3">
                <h1>Status is: </h1>
                <span className="text-black">{data.status}</span>
            </div>
            <div className="mt-3">
                <h1>Username is: </h1>
                <span className="text-black">{data.username}</span>
            </div>
            <div className="mt-3">
                <h1>Name is: </h1>
                <span className="text-black">{data.name}</span>
            </div>
            <div className="mt-3">
                <h1>Address is:</h1>
                <span className="text-black">{data.address}</span>
            </div>
            <div className="mt-3">
                <h1>Number phone: </h1>
                <span className="text-black">{data.phoneNumber}</span>
            </div>
            <div className="mt-3">
                <h1>Note: </h1>
                <span className="text-black">{data.note}</span>
            </div>
            <div className="mt-3">
                <h1>Total price: </h1>
                <span className="text-red-500 text-lg font-bold">
                    {data.total}
                </span>
            </div>
            <div className="mt-3">
                <h1>List item: </h1>
                {data.purchased.map((item, index) => (
                    <div className="grid grid-cols-6 mt-10">
                        <div className="col-span-2">
                            <img
                                className="w-[100px]"
                                src={item.image}
                                alt="img err"
                            />
                        </div>
                        <div className="col-span-2">
                            <h1>Title: </h1>
                            <p>{item.title}</p>
                        </div>
                        <div className="col-span-2 flex">
                            <h1>Amount: </h1>
                            <h1 className="ml-3 text-red-500">{item.amount}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListOrder;
