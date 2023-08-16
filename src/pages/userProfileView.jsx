// UserProfileViewer.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase'; // Import your Firebase configuration and modules for Firestore
import { doc, getDoc } from 'firebase/firestore';

const UserProfileViewer = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

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

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Display Name: {userProfile.displayName}</p>
      <p>Email: {userProfile.email}</p>
      {/* Other user information */}
    </div>
  );
};

export default UserProfileViewer;
