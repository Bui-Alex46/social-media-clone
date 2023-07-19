import React, {useRef} from "react";
import {firestore } from "../firebase"
import {addDoc, collection} from "firebase/firestore"


const Home = () => {
    const messageRef = useRef();
    const ref = collection(firestore, "messages");


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(messageRef.current.value);
        let data = {
            message : messageRef.current.value
        }
        try{
            addDoc(ref, data)
        }catch{
            console.log(e)
        }
    }
    return (
        <div>
            <h1> home </h1>
        </div>
    )
}
export default Home