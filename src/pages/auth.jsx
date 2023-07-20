import React, {useState, useEffect} from 'react';
import {auth} from '../firebase'
import { signOut, GoogleAuthProvider, signInWithPopup, signInWithRedirect, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import './css/auth.css';
import {GoogleButton} from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import SignOutPage from './signout'
import SignInPage from './signIn'


const Authentication = () => {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                // User is signed in
                console.log('User', user);
                
            }else{

                setIsSignedIn(false)
            }
        })
        // Cleaning up listerner after component unmounts
        return () => {
            unsubscribe();
        }
    }, [])
    
    // const handleSignOut = () => {
    //     signOut(auth).then(() => {
    //         setIsSignedIn(false)
    //         console.log('logged out')
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }
    
    
    return( 
    <div className='auth-container'>
       {isSignedIn === true? (
        <SignOutPage/>
       ) : (<SignInPage />)}
        
    </div>
    );
}
export default Authentication