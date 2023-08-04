import React ,{useEffect} from 'react';
import './css/Explore.css'
import {Timeline} from "react-twitter-widgets"
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
    return (
        <div className = "Explore-container">
            <div className = "search-bar-container">
                <input type = "text" placeholder = "Search" className = 'search-bar' />
                <p> For You</p>
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