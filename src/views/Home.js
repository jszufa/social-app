import React, { useState, useEffect } from 'react';
import axios from "axios";
import Post from '../components/Post';
import AddPost from '../components/AddPost';

import "./Home.css"

function Home(props) {

    const [posts, setPosts] = useState([]);
    const [deletePostId, setDeletePostId] = useState(null);


    useEffect(() => { getLatestPosts(); }, [/* user */]);

    const getLatestPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/latest`)
            .then((response) => {
                setPosts(response.data);
            })
            .catch((err)=>{console.error(err)})
            ;

    }


    const getNextPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/older-then`,
            { "date": posts[posts.length - 1].created_at }
        )
            .then((response) => {

                let olderPosts = response.data;
                setPosts(posts.concat(olderPosts));

            })
            .catch((err)=>{console.error(err)})
            ;;

    }

    const getPrevPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/newer-then`,
            { "date": posts[0].created_at }
        )
            .then((response) => {

                let newPosts = response.data;
                setPosts(newPosts.concat(posts));

            })
            .catch((err)=>{console.error(err)})
            ;;

    }

    const deletePost = (id) => {

        console.log(id)
        axios.post(`https://akademia108.pl/api/social-app/post/delete`,
            { "post_id": id }
        )
            .then((response) => {

                setPosts(posts.filter((post) => post.id !== id));

            })
            .catch((err)=>{console.error(err)})
            ;;

    }




    return (

        <div className='postList'>
            <AddPost getPrevPosts={getPrevPosts} />
            {deletePostId &&
                <div className='confirmationBox'>
                    <p>Are you sure you want to delete the post?</p>
                    <button className='yesBtn' onClick={() => {
                        deletePost(deletePostId);
                        setDeletePostId(null);
                    }}>Yes</button>
                    <button className='noBtn' onClick={() => setDeletePostId(null)}>No</button>
                </div>}
            {posts.map((post) => {
                return (
                    <Post post={post} key={post.id} id={post.id} user={props.user} deletePost={deletePost} setDeletePostId={setDeletePostId} />
                )
            })}
            <button className='loadMoreBtn' onClick={() => { getNextPosts() }}>Load more</button>
        </div>
    )
}

export default Home;