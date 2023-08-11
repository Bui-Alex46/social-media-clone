import React, {useState, useEffect} from 'react';
import { Link} from 'react-router-dom';
import './css/Navbar.css'
import Modal from 'react-modal'
import './css/Post.css'
import { auth  } from '../firebase';
import {  setPersistence , browserSessionPersistence } from 'firebase/auth';
import {db} from '../firebase'
import {addDoc, collection} from 'firebase/firestore'

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
}

const closeModal = () => {
    setModalIsOpen(false);
}

const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = auth.currentUser
    setPersistence(auth,browserSessionPersistence).then(() => {
        if (currentUser){
            setUser(currentUser)
            console.log('Persistence set')
    }else{
        console.log('no user')
    }
       
    })
    }, [])

const [post, setPost] = useState("")
const addPost = async (e) => {
  e.preventDefault();
  try{
    const docRef = await addDoc(collection(db, "posts"), {
      post: post,
    });
    console.log("Doc written with ID: ", docRef.id);
  }catch(e){
    console.error("Error adding document: ", e);
  }
}

    return (
    <div className='navbar'>
    <ul>
      <li> <Link to = "/home"> Home</Link></li>
      <li> <Link to = "/practice"> Practice</Link></li>
      <li> <Link to = "/profile"> Profile</Link></li>
      <li> <Link to = "/messages"> Messages</Link></li>
      <li> <Link to = "/explore"> Explore</Link></li>

      {/* Modal for Posting */}
      <li> <button onClick = {() => openModal()}> Post</button>
        <Modal isOpen = {modalIsOpen} onRequestClose = {closeModal} className = "modal">
          <form onSubmit = {addPost} >
          <button className = "close-button" onClick = {() => closeModal()}>
            <span>&times;</span>
          </button>
            {/* <img alt = "User" className = "profile-pic-modal" src = {user.photoURL} /> */}
            <input type = 'text' value = {post} onChange = {(e) => setPost(e.target.value)} className='input-field' placeholder='What is happening?!'></input>
            <button type = "submit"> Post</button>
          </form>
          
        </Modal></li>


      <li> <Link to = "/post"> Post</Link></li>
      <li> <Link to = "/auth"> Login / Sign Out</Link></li>
    </ul> 
    </div>
    )
}
export default Navbar