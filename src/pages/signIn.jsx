import React from 'react';
import {auth} from '../firebase';
import {GoogleAuthProvider, signInWithRedirect, setPersistence, browserSessionPersistence} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {GoogleButton} from 'react-google-button';


const SignInPage = () => {
    const navigate = useNavigate()
   
    const provider = new GoogleAuthProvider()
    const handleGoogleSignIn = async(e) => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            console.log('Persistence set')
           return signInWithRedirect(auth, provider).catch((error) => {
                console.log(error)
            })
        })
        navigate('/home')
        
    };
    return (
        <div className = "auth-container">
             <GoogleButton onClick = {handleGoogleSignIn}> signin</GoogleButton>
             
        </div>
    )
}
export default SignInPage