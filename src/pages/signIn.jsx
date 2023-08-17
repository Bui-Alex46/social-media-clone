import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, setPersistence, browserSessionPersistence, signInWithRedirect, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';

const SignInPage = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [userCreated, setUserCreated] = useState(false);
  
    const createUser = async (user) => {
      try {
        if (user && !userCreated) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (!userDocSnap.exists()) {
            const newUser = {
              displayName: user.displayName,
              email: user.email,
              uid: user.uid,
              photoURL: user.photoURL,
            };
            await setDoc(userDocRef, newUser);
            console.log('New user document created with ID:', user.uid);
          }
          setUserCreated(true); // Set the flag to prevent redundant user creation
        }
      } catch (error) {
        console.error("Error creating user", error);
      }
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in
          createUser(user);
          console.log("user", user);
          navigate('/home');
        } else {
          // User is signed out
          console.log("user is signed out")
          // Add any necessary sign-out logic here
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    const handleGoogleSignIn = async () => {
      try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithRedirect(auth, provider);
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };
  
    
  
    return (
      <div className="auth-container">
        <GoogleButton onClick={handleGoogleSignIn}>Sign In with Google</GoogleButton>
      </div>
    );
  };
  
  export default SignInPage;
