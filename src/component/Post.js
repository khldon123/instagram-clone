import React, {useEffect, useState} from 'react'
import "./post.css"
import Avatar from "@material-ui/core/Avatar";
import { collection, collectionGroup, deleteDoc, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, db } from './config';
import AddComment from './AddComment';
import CommentOptions from './CommentOptions';

function Post({username,postId, content, imgUrl}) {


    const [comments, setComments] = useState([])
    
    useEffect(async () => {

        const commentsRef = collection(db,"posts", postId, "comments")

        const commentsQuery = await query(commentsRef, orderBy("createdAt", "asc"))
        onSnapshot(
            commentsQuery, 
            (snapshot) => {
                setComments(
                    snapshot.docs.map(doc => {
                        return {
                            ...doc.data(),
                            id: doc.id
                        }
                }))
            }
            )
    }, [])

    const deleteComment = async (commentId) => {

        const docRef = doc(db, `posts/${postId}/comments/${commentId}`)
        await deleteDoc(docRef)
        
    }

    return (

        <div className='post'>
            <div className="post_header">
                <Avatar
                    className='post_header_avatar'
                    alt={username}
                    src= "/asdd"
                />
                <h3 className='post_header_username'>{username}</h3>
            </div>
            <div className="post_img">
                <img src={imgUrl} alt="" />
            </div>
            <div className="post_content">

                <p><strong>{username}</strong> {content}</p> 
            </div>
            {comments.map(comment => {
                return (
                    <div key={comment.id} className="post_comments">
                        <div>
                            <strong>{comment.username}: </strong> <span>{comment.text}</span>
                        </div>
                        {(comment.username == auth.currentUser.displayName) ? <CommentOptions postId={postId} commentId={comment.id}/> : null }
                    </div>
                )

            })}
            <AddComment postId={postId}/>

        </div>
    )
}

export default Post