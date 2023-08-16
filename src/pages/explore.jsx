import React ,{useEffect, useState} from 'react';
import './css/Explore.css'
import {Timeline} from "react-twitter-widgets"
import {auth, db} from '../firebase'
import {getDocs, collection} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
const Explore = () => {
    const handleScroll = () => {
        const searchBarContainer = document.querySelector('.search-bar-container');
        if (searchBarContainer) {
          const isScrolled = window.scrollY > 0;
          if (isScrolled) {
            searchBarContainer.classList.add('transparent');
          } else {
            searchBarContainer.classList.remove('transparent');
          }
        }
      };
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    // Create a userSearch Engine 
    const [foundUsers, setFoundUsers] = useState([]);
    const handleUserSearch = async (searchTerm) => {
      if(!searchTerm){
        setFoundUsers([]);
        return;
      }
      try{
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const matchingUsers = querySnapshot.docs.map((doc) => doc.data())
        .filter((user) => user.displayName.toLowerCase().includes(searchTerm.toLowerCase())); 
        setFoundUsers(matchingUsers)
        console.log('Matching users:', matchingUsers)
      }catch(error){
        console.error('Error searching users:', error)
      }
    }


    // Function to redirect to user's profile
    const navigate = useNavigate();
    const handleProfileClick = (userId) => {
      navigate(`/profile/${userId}`);
    }

    return (
        <div className = "Explore-container">
            <div className = "search-bar-container">
                <input type = "text" 
                placeholder = "Search" 
                className = 'search-bar'
                onChange = {(e) => handleUserSearch(e.target.value)} />
                <p> For You</p>
            </div>

            <div className="user-list">
             
              {/* Loop through the found users and display them */}
                {foundUsers.map((user) => (
              <div key={user.uid} className="user-item" onClick={() => handleProfileClick(user.uid)}>
              <img src={user.photoURL} alt={user.displayName} />
              <p>{user.displayName}</p>
        
                </div>
                ))}
            </div>
            
           <Timeline
                dataSource={{
                    sourceType: 'profile',
                    screenName: 'AlexHormozi'
                }}
                options = {{ width: "700px"}}
            />
            <Timeline 
                dataSource={{
                    sourceType: 'profile',
                    screenName: 'jordanbpeterson'
                }}
                options = {{ width: "700px"}}            
            />
            <Timeline 
                dataSource={{
                    sourceType: 'profile',
                    screenName: 'ElonMusk'
                }}
                options = {{ width: "700px"}}            
            />    
           
           
            
        </div>
    )
}
export default Explore