import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase'
import Post from './Post'
function Posts({ posts }) {
    const [realtimePosts, loading, error] = useCollection(db.collection("posts").orderBy("timestamp", "desc"))
    console.log(`bnuu`, realtimePosts)
    return (
        <div>
            {
                realtimePosts ?
                    realtimePosts?.docs.map((post) => (
                        <Post
                            key={post.id}
                            name={post.data().name}
                            message={post.data().message}
                            email={post.data().email}
                            timestamp={post.data().timestamp}
                            image={post.data().image}
                            postImage={post.data().postImage}
                        />
                    )) : (
                        posts.map(post => (
                            <Post
                                key={post.id}
                                name={post.data().name}
                                message={post.data().message}
                                email={post.data().email}
                                timestamp={post.data().timestamp}
                                image={post.data().image}
                                postImage={post.data().postImage}
                            />
                        ))
                    )
            }
        </div>
    )
}

export default Posts
