import React, {useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './css/Navbar.css'
import Modal from 'react-modal'
import './css/Post.css'
import {db, auth} from '../firebase'
import {addDoc, collection, doc} from 'firebase/firestore'



const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
}

const closeModal = () => {
    setModalIsOpen(false);
}

const [post, setPost] = useState("")
const navigate = useNavigate();
const user = auth.currentUser;
const addPost = async (e) => {
  e.preventDefault();
  try{
    const userPostsRef = collection(db,'users',user.uid, 'posts')
    const docRef = await addDoc(userPostsRef, {
      post: post,
      timestamp: new Date(),
    });
    console.log("Doc written with ID: ", docRef.id);
    closeModal();
    navigate('/profile');
    
  }catch(e){
    console.error("Error adding document: ", e);
  }
}

    return (
    <div className='navbar'>
    <ul>
      <li> <Link to = "/home"> Home</Link></li>
      <li> <Link to = "/profile"> Profile</Link></li>
      <li> <Link to = "/messages"> Messages</Link></li>
      <li> <Link to = "/explore"> Explore</Link></li>

      {/* Modal for Posting */}
      <li> <button className = "post-button" onClick = {() => openModal()}> Post</button>
        <Modal isOpen = {modalIsOpen} onRequestClose = {closeModal} className = "modal">
          <form onSubmit = {addPost} >
          <button className = "close-button" onClick = {() => closeModal()}>
            <span>&times;</span>
          </button>
            {/* <img alt = "User" className = "profile-pic-modal" src = {user.photoURL} /> */}
            <input type = 'text' value = {post} onChange = {(e) => setPost(e.target.value)} className='input-field' placeholder='What is happening?!'></input>
            <button className = "post-button-modal" type = "submit"> Post</button>
          </form>
          
        </Modal></li>
      <li> <Link to = "/auth" className='login-button'> Login / Sign Out</Link></li>
    </ul> 
    </div>
    )
}
export default Navbar