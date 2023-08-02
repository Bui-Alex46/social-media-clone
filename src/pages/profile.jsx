import React , {useState} from 'react';
import './css/Profile.css'
import {firestore } from "../firebase"
import {addDoc, collection} from "firebase/firestore"
import { auth  } from '../firebase';
import { onAuthStateChanged, setPersistence, signInWithRedirect, inMemoryPersistence, browserSessionPersistence } from 'firebase/auth';
import axios from 'axios'
import {storage} from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
const Profile = () => {
   
    const user = auth.currentUser
    setPersistence(auth,browserSessionPersistence).then(() => {
        if (user){
            console.log('Persistence set')
    }else{
        console.log('no user')
    }
       
    })
    // Need to implement storing profle picture to user's database. 
    // Need to create database for user's profile picture
    return (
        <div className = "Profile-container">
             <h1> Profile</h1>
             <img className = "profile-pic" src = {user.photoURL}/>
             <h2 className = "username"> {user.displayName} </h2>
             <h4 className = "userEmail"> {user.email}</h4>
        </div>
        
       
    )
}
export default Profile