// UserProfileViewer.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // Import your Firebase configuration and modules for Firestore
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import './css/Profile.css'

const UserProfileViewer = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [userProfilePosts, setUserProfilePosts] = useState([]);

 
  useEffect(() => {
    // Fetch user profile data using the userId
    const fetchUserProfile = async () => {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data());
      } else {
        console.log(`User with ID ${userId} not found.`);
      }
    };

    fetchUserProfile();
  }, [userId]);
  const fetchUserPosts = async () => {
    const userPostDocRef = collection(db, 'users', userId, 'posts');
    const userPostSnapshot = await getDocs(userPostDocRef)
    const newData = userPostSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));
    setUserProfilePosts(newData);
  }
  useEffect(() => {
    fetchUserPosts();
  }, []);

  if (!userProfile) {
    return <p>Loading...</p>;
  }
  
  return (
    <div className = "Profile-container">

      <h1>{userProfile.displayName}</h1>
      <img alt = "User" className = "profile-pic" src = {userProfile.photoURL} />
      <h2 className = "username" >{userProfile.displayName}</h2>
      <h4 className = "userEmail">{userProfile.email}</h4>
      {/* Other user information */}
      <ul className = "user-post-content">
        {userProfilePosts?.map((post,i)=>(
            <li key = {i} className = 'new-Post'>
            <img alt = "User" className = "profile-pic-post" src = {userProfile.photoURL} />
             {post.post}
            </li> 
        ))}
      </ul>
    </div>
  );
};

export default UserProfileViewer;
