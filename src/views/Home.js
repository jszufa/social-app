import React, { useState, useEffect } from 'react';
import axios from "axios";
import Post from '../components/Post';

function Home() {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => { getLatestPosts(); }, [user]);

    const getLatestPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/latest`)
            .then((response) => {
                setPosts(response.data);
            });

    }

    console.log(posts);



    return (

        <div className='postList'>
             <h2>Home</h2>
            {posts.map((post)=>{
                return (
                    <Post post={post} key={post.id} />
            )})}
        </div>
    )
}

export default Home;