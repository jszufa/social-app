import React, { useState, useEffect } from 'react';
import axios from "axios";
import Post from '../components/Post';
import AddPost from '../components/AddPost';

import "./Home.css"

function Home(props) {

    const [posts, setPosts] = useState([]);
    const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);


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

    const getPrevPosts = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/newer-then`,
            { "date": posts[0].created_at }
        )
            .then((response) => {

                let newPosts = response.data;
                setPosts(newPosts.concat(posts));

            });

    }

    const deletePost = (id) => {
        if (window.confirm('Are you sure you want to delete the post')) {

            /* czy da się zrobić tutaj konfirmację w czasie rzeczywistym
            czy raczej odpalić w stanie post wyświetlanie okna i zapisać w stanie id, a potem odpalić funkcję deletePost po kliknięciu yes i id pobrać sobie z zapisanego stanu? */

            console.log(id)
            axios.post(`https://akademia108.pl/api/social-app/post/delete`,
                { "post_id": id }
            )
                .then((response) => {

                    setPosts(posts.filter((post) => post.id !== id));

                });
        }
    }




    return (

        <div className='postList'>
            <AddPost getPrevPosts={getPrevPosts} />
            <div className='confirmationBox'>
                {/* Tutaj edytować */}
                <p>Are you sure you want to delete the post?</p>
                <button className='yesBtn' onClick={() => setDeleteModalDisplay(false)}>Yes</button>
                <button className='noBtn' onClick={() => setDeleteModalDisplay(false)}>No</button>
            </div>
            {posts.map((post) => {
                return (
                    <Post post={post} key={post.id} id={post.id} user={props.user} deletePost={deletePost} />
                )
            })}
            <button className='loadMoreBtn' onClick={() => { getNextPosts() }}>Load more</button>
        </div>
    )
}

export default Home;