import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { GoogleButton } from 'react-google-button';
import { auth, provider } from '~/Layout/DefaultLayout/DefaultLayout';

function Login() {

    // const [value,setValue] = useState('')
    // const handleGoogleSignIn =()=>{
    //     signInWithPopup(auth,provider).then((data)=>{
    //         setValue(data.user.email)
    //         localStorage.setItem("email",data.user.email)
    //     })
    // }

    // useEffect(()=>{
    //     setValue(localStorage.getItem('email'))
    // })
    const googleSignIn = () => {
        signInWithPopup(auth, provider);
    };
    const handleGoogleSignIn = () => {
        try {
            googleSignIn();
            
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="text-center">
            <h3>Login Form</h3>
            <p className="translate-x-[40%] ">
                <GoogleButton onClick={handleGoogleSignIn} />
                {/* <button onClick={handleGoogleSignIn}>Signin With Google</button> */}
            </p>
        </div>
    );
}

export default Login;
