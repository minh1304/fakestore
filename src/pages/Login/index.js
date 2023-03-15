import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { GoogleButton } from 'react-google-button';
import * as userApi from '~/apiServices/userApi';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '~/app/userSlice';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authUser = JSON.parse(localStorage.getItem('user'));
    console.log(authUser);
    const dispatch = useDispatch();


    useEffect(() => {
        if (!authUser) return;
        else {
            dispatch(setToken(authUser.data.data.access_token));
            dispatch(setUser(authUser));
        }
    }, [authUser]);
    const loginUser = () => {
        axios
            .post(
                'https://api.storerestapi.com/auth/login',
                {
                    // email: 'marklyan@gmail.com',
                    // password: 'simple_password',
                    email: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                },
            )
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response));
                window.location.reload();

                // console.log(response.data.data.access_token);
            })
            .catch((error) => console.error(error));
    };
    // const googleSignIn = () => {
    //     signInWithPopup(auth, provider);
    // };
    // const handleGoogleSignIn = () => {
    //     try {
    //         googleSignIn();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const handleLogOut = () => {
        localStorage.removeItem('user');
        window.location.reload();
    };
    return (
        <div className="text-center">
            {authUser ? (
                <div>
                    <h1>Có acc</h1>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogOut();
                        }}
                        className="bg-red-500"
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div>
                    <h3>Login Form</h3>

                    <form>
                        <div className="">
                            <input
                                type={'text'}
                                placeholder={'username'}
                                name={'email'}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className=" ">
                            <input
                                type={'password'}
                                placeholder={'Password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className=""
                            onClick={(e) => {
                                e.preventDefault();
                                loginUser();
                            }}
                        >
                            Log in
                        </button>
                    </form>

                    <p className="translate-x-[40%] ">
                        {/* <GoogleButton onClick={handleGoogleSignIn} /> */}
                        {/* <button onClick={handleGoogleSignIn}>Signin With Google</button> */}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Login;
