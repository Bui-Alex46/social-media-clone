import React , {useState} from 'react';
import './css/Profile.css'
import { auth  } from '../firebase';
import { onAuthStateChanged, setPersistence, signInWithRedirect, inMemoryPersistence, browserSessionPersistence } from 'firebase/auth';
import axios from 'axios'
import {storage} from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
const Profile = () => {
    const [profilePic, setProiflePic] = useState(null)
    const [percent, setPercent] = useState(0)
    const user = auth.currentUser
    setPersistence(auth,browserSessionPersistence).then(() => {
        if (user){
            console.log('Persistence set')
    }else{
        console.log('no user')
    }
       
    })
 
    // On Change function 
    const fileSelected = (e) => {
        e.preventDefault()
        setProiflePic(URL.createObjectURL(e.target.files[0]))
    }

    // Upload the file and send to firebase storage.
    const handleUpload = () => {
        if(profilePic){
            alert('Please upload a file')
        }
        const storageRef = ref(storage, 'images/' + user.uid + '.jpg')
        const uploadTask = uploadBytesResumable(storageRef, profilePic);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const percent = Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100);
                setPercent(percent);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                })
            }
    
        )
    }

    // Need to implement storing profle picture to user's database. 
    // Need to create database for user's profile picture
    return (
        <div className = "Profile-container">
             <h1> Profile</h1>
             <input type = "file" onChange = {fileSelected} />
             <button type = "button" onClick = {handleUpload}> Upload </button>
             <p>{percent} % uploaded</p>
             {profilePic && <img className = "profile-pic" src = {profilePic}/> }
             <h2 className = "username"> {user.displayName} </h2>
        </div>
       
    )
}
export default Profile