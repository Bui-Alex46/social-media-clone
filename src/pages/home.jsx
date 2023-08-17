import React , {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {firestore } from "../firebase"
import {addDoc, getDocs, collection} from "firebase/firestore"
import './css/Home.css'
import { eagerLoadTwitterLibrary, Tweet} from 'react-twitter-widgets'
import { auth } from '../firebase';
import {db} from '../firebase';
const Home = () => {
    const currentUser = auth.currentUser
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [addPosts, setAddPosts] = useState("")
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
    eagerLoadTwitterLibrary();
    const addPost = async (e) => {
        e.preventDefault();
        try{
          const userPostsRef = collection(db,'users',currentUser.uid, 'posts')
          const docRef = await addDoc(userPostsRef, {
            post: addPosts,
            timestamp: new Date(),
          });
          console.log("Doc written with ID: ", docRef.id);
          navigate('/profile');
        }catch(e){
          console.error("Error adding document: ", e);
        }
      }
    return (
        <div className="Home-container">
            <h1 className = "home"> Home </h1>
            <form onSubmit = {addPost} className = 'home-post' >
            <input type = 'text' value = {addPosts} onChange = {(e) => setAddPosts(e.target.value)} className='input-field-home' placeholder='What is happening?!'></input>
            <button
                className={`post-button-modal-home ${addPosts ? 'active' : ''}`}
                type='submit'
            >
                Post
            </button>
          </form>
            <Tweet 
            options = {{align: 'left',width: '1800px'}}
            tweetId = '1686624230035587072' 
            />
            <Tweet options = {{align: 'left'}}tweetId = '1686161726121619458' />
            <ul className = "post-content-home">
                {post?.map((post,i)=>(
                    <li key = {i} className = 'new-Post'>
                    <img alt = "User" className = "profile-pic-post" src = {currentUser.photoURL} />
                     {post.post}
                    </li> 
                ))}
            </ul>
        </div>
    )
}
export default Home