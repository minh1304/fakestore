import axios from 'axios';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const getFirebaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        return currentUser.getIdToken();
    }
};

const request = axios.create({
    baseURL: 'https://fakestoreapi.com/',
});

request.interceptors.request.use(async (config) => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        const token = await currentUser.getIdToken();
        console.log('token nè: ', token);
        config.headers.Authorization = `Bearer ${token}`;
    }
    // const token = await getFirebaseToken();
    // if (token) {
    //     // const token = await currentUser.getIdToken();
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
});
export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response.data;
};

export const post = async (uri, data, options = {}) => {
    const response = await request.post(uri, data, options);
    return response.data;
};
export default request;
