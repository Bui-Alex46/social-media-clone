import React from "react";
import {firestore } from "../firebase"
import {addDoc, collection} from "firebase/firestore"
import './css/Home.css'
import { eagerLoadTwitterLibrary, Tweet} from 'react-twitter-widgets'

const Home = () => {
    eagerLoadTwitterLibrary();
    return (
        <div className="Home-container">
            <h1 className = "home"> Home </h1>
            <Tweet 
            options = {{align: 'left',width: '1800px'}}
            tweetId = '1686624230035587072' 
            />
            <Tweet options = {{align: 'left'}}tweetId = '1686161726121619458' />
             
        </div>
    )
}
export default Home