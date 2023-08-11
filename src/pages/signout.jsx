import React , {useState} from 'react';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
const SignOutPage = () => {
    const navigate = useNavigate()
    const [isSignedIn, setIsSignedIn] = useState(true);
    
    const handleSignOut = () => {
        signOut(auth).then(() => {
            setIsSignedIn(false)
            console.log('logged out')
            navigate('/signIn')
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        
        <div className = 'auth-container'> 
        <button type = "button" onClick = {handleSignOut}> log out </button> 
        </div>
    )
}

export default SignOutPage