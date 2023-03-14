import React, {useState} from 'react';
import axios from "axios";

import './AddPost.css';

//zostało tylko stylowanie

function AddPost(props) {

    const [postContent, setPostContent] = useState();

    const handleTextArea = (e) => {
        const target = e.target;

        setPostContent({
            content : target.value
        });
    }

    const addPost = (e) => {
        e.preventDefault();

        /* console.log(postContent); */
        axios.post(`https://akademia108.pl/api/social-app/post/add`,
            postContent
        )
            .then((response) => {
                /* console.log(response); */
                
                props.getPrevPosts();
            })
    }



    return (

        <form className='addPostForm'>
            <textarea name="postTextArea" id="postTextArea" placeholder='Add post...' onChange={(e) => { handleTextArea(e)}}></textarea>
            <button className='addPostBtn' onClick={(e) => { addPost(e) }}>Add</button>
        </form>
    )
}

export default AddPost;