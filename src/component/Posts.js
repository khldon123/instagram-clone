import React, {useEffect, useState} from 'react'
import Post from './Post';
import "./posts.css"
import {db} from "./config"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(async () => {
        // gettng data from the db
        const postsRef = collection(db, "posts")
        const postsQuery = await query(postsRef, orderBy("createdAt", "asc"))
        onSnapshot(
            postsQuery, 
            (snapshot) => {
                setPosts(snapshot.docs.map((doc) => {
                    return {
                        ...doc.data(),
                        id:doc.id
                    }
                    
                }))
        },
        orderBy("createdAt", "desc")
        )
    },[])
    return (

        <div className="posts">
            {
                posts.map((post) => {
                return (
                    <Post key={post.id} postId={post.id} username={post.username} imgUrl={post.imgUrl} content={post.content} />
                )
                })
            }
        </div>
    )
}

export default Posts