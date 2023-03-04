import React, { useState, useEffect } from 'react';
import axios from "axios";
import Post from '../components/Post';

import "./Home.css"

function Home() {

    const [posts, setPosts] = useState([]);


    useEffect(() => { getLatestPosts(); }, [/* user */]);

    const getLatestPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/latest`)
            .then((response) => {
                setPosts(response.data);
            });

    }


    const getNextPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/older-then`,
            { "date": posts[posts.length - 1].created_at }
        )
            .then((response) => {

                let olderPosts = response.data;
                setPosts(posts.concat(olderPosts));

            });

    }





    return (

        <div className='postList'>
            <h2>Home</h2>
            {posts.map((post) => {
                return (
                    <Post post={post} key={post.id} />
                )
            })}
            <button className='loadMoreBtn' onClick={() => { getNextPosts() }}>Load more</button>
        </div>
    )
}

export default Home;