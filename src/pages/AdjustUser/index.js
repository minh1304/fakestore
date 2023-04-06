import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '~/app/userSlice';
import Account from './Account';
function AdjustUser() {
    // useEffect(() => {

    // })
    const user = useSelector(selectUser);
    const token = user.data.token;
    const [data, setData] = useState([])
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/auth/admin/users',
            headers: {
                'x-access-token': token,
            },
        };

        axios
            .request(config)
            .then((response) => {
                setData(response.data.accounts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    // console.log(data);
    return (
        <div className=" xl:grid xl:grid-cols-12 2xl:grid 2xl:grid-cols-10">
            <div className="xl:col-span-1"></div>
            <div className="xl:col-span-10 2xl:col-span-10">
                <div className="col-span-1 ml-5">
                    <p className='text-xl font-bold'>List user</p>
                    <hr className='mt-5 mb-5'></hr>
                    {data.map(account => (
                        // <p key={acc._id}>{acc.username}</p>
                        <Account key={account._id} data={account}/>
                    ))}
                </div>
            </div>
            <div className="xl:col-span-1"></div>
        </div>
    );
}

export default AdjustUser;
