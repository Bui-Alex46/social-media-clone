import React, {useState, useEffect} from 'react';
import {auth} from '../firebase'
import { GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth';
import './css/auth.css';
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

    return( 
    <div className='auth-container'>
       {isSignedIn === false? (
        <SignOutPage/>
       ) : (<SignInPage />)}
        
    </div>
    );
}
export default Authentication