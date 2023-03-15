import Sidebar from '../components/Sidebar';
import { createContext, useEffect, useState } from 'react';
// import CartProvider from '~/context/CartProvider';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import { store } from '~/app/store';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import * as productApi from '~/apiServices/productApi';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyABKJSKac31hSPgRfCYDNf4WGrETpCdCXQ",
    authDomain: "economic-691ea.firebaseapp.com",
    projectId: "economic-691ea",
    storageBucket: "economic-691ea.appspot.com",
    messagingSenderId: "314514195539",
    appId: "1:314514195539:web:b1e71e8f59836325b932a6",
    measurementId: "G-ZPRK7V1LS8"
  };
firebase.initializeApp(config);
// Initialize Firebase
const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

export const Data = createContext();
function DefaultLayout({ children }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const productResult = await productApi.getProduct();
            setData(productResult);
        };
        fetchApi();
    }, []);
    useEffect(() => {
        const unregisterAuthObserver = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                // setIsSignedIn(!!user);
                if (!user) {
                    console.log('not user');
                    return;
                }
                console.log('logged in user: ', user.displayName);
                const token = await user.getIdToken();
                console.log('logged in user token: ', token);
            });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    // const handleTest = ()=> {
    //     const fetchApi = async () => {
    //         const productResult = await productApi.getProduct();
    //         setData(productResult);
    //     };
    //     fetchApi();
    // }
    return (
        <Data.Provider value={{ data }}>
            <Provider store={store}>
                {/* <button onClick={handleTest} className='text-black w-10 h-10 bg-red-500'>ahihi</button> */}
                <Sidebar />
                <div className="overflow-y-auto top-0 left-0 bg-white">
                    <div className="mt-[82px] max-w-7xl mx-auto">
                        <div>{children}</div>
                    </div>
                </div>
                <Footer />
            </Provider>
        </Data.Provider>
    );
}

export default DefaultLayout;
