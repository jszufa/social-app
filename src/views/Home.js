import React, { useState, useEffect } from 'react';
import axios from "axios";

function Home() {

    const [posts, setPosts] = useState();

    useEffect(() => {getLatestPosts();}, []);
    
    const getLatestPosts = () => {
        
            axios.post(`https://akademia108.pl/api/social-app/post/latest`)
            .then((response) => {
                setPosts(response.data);
            });
            
    }

    console.log(posts);

    

    return (
        <h2>Home</h2>
    )
}

export default Home;