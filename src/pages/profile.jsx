import React, {useState, useEffect} from 'react';
import './css/Profile.css'
import { auth  } from '../firebase';
import {  setPersistence , browserSessionPersistence } from 'firebase/auth';

const Profile = () => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = auth.currentUser
    setPersistence(auth,browserSessionPersistence).then(() => {
        if (currentUser){
            setUser(currentUser)
            console.log('Persistence set')
    }else{
        console.log('no user')
    }
       
    })
    }, [])
    
    // Need to implement storing profle picture to user's database. 
    // Need to create database for user's profile picture
    return (
        <div className = "Profile-container">
             
             {user ? (<>
            <h1 className = "header-name">{user.displayName}</h1>
             <img alt = "User" className = "profile-pic" src = {user.photoURL} />
             <h2 className = "username"> {user.displayName} </h2>
             <h4 className = "userEmail"> {user.email}</h4></>) : <p>Loading...</p>}
        
        </div>
       
    )
}
export default Profile