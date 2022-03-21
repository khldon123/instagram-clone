import { Button, Input } from '@material-ui/core'
import React, { useState } from 'react'
import {db, auth} from "./config"
import { addDoc, collection, collectionGroup, serverTimestamp } from 'firebase/firestore'
import "./addcomment.css"

function AddComment({postId}) {

    const [comment, setComment] = useState("")

    const postCommnet = () => {
        const collectionRef = collection(db, "posts", postId, "comments")
        const payload = {
            username: auth.currentUser.displayName,
            text:comment,
            createdAt:serverTimestamp()
        }
        addDoc(collectionRef, payload)
        setComment("")
    }
    return (
        <div className='add_comment' >
            <input className='add_comment_field' placeholder='Add a Comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
            
            <button className='add_comment_btn' onClick={postCommnet} disabled={!comment} >Post</button>
        </div>
    )
}

export default AddComment