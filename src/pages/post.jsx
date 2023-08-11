import React ,{useState} from 'react'
import './css/Post.css'
import Modal from 'react-modal'
const Post = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [post, setPost] = useState('Post')

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }
    return (
        <div className = "Post-container">
            
            <button onClick = {() => openModal()}></button>
            <Modal isOpen = {modalIsOpen} onRequestClose = {closeModal} className = "modal">
                <h1> Post</h1>
                
             </Modal>
            
        </div>
        
    )
}
export default Post