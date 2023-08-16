import React, {useState, useEffect} from 'react';
import './css/Profile.css'
import { auth  } from '../firebase';
import {  setPersistence , browserSessionPersistence } from 'firebase/auth';
import {collection, getDocs} from "firebase/firestore"
import {db} from '../firebase'

const Profile = () => {

    const [user, setUser] = useState(null);
    const currentUser = auth.currentUser
    useEffect(() => {
        
    setPersistence(auth,browserSessionPersistence).then(() => {
        if (currentUser){
            setUser(currentUser)
            console.log('Persistence set')
            console.log(currentUser)
    }else{
        console.log('no user')
    }
       
    })
    }, [])

    const [post, setPost] = useState([])
    const fetchPost = async () => {
        if(currentUser){
            const userPostsRef = collection(db, "users", currentUser.uid, "posts")
            const snapshot = await getDocs(userPostsRef)
            const newData = snapshot.docs.map((doc) => ({
                ...doc.data(), 
                id: doc.id
            }));
            setPost(newData)
            console.log(newData)
        }
    };
    
    useEffect(() => {
        fetchPost();
    }, [])
    // Need to implement storing profle picture to user's database. 
    // Need to create database for user's profile picture
    return (
        <div className = "Profile-container">
             
             {user ? (<>
            <h1 className = "header-name">{user.displayName}</h1>
             <img alt = "User" className = "profile-pic" src = {user.photoURL} />
             <h2 className = "username"> {user.displayName} </h2>
             <h4 className = "userEmail"> {user.email}</h4>
             
             {/* Content Section */}
             <ul className = "post-content">
                {post?.map((post,i)=>(
                    <>
                    <img alt = "User" className = "profile-pic-post" src = {user.photoURL} />
                    <li className = "new-Post" key = {i} >{post.post}</li> 
                    </>
                             
                    ))
                }
            </ul>
             
             
             </>) : <p>Loading...</p>}
            
            
        </div>
    )
}
export default Profile