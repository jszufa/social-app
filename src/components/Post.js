import React from 'react';
import axios from 'axios';
import './Post.css';

function Post(props) {


    const deletePost = () => {

        axios.post(`https://akademia108.pl/api/social-app/post/delete`,
            { "post_id": props.id }
        )
            .then((response) => {

                console.log(response);
                /* let newPosts = response.data;
                setPosts(newPosts.concat(posts));
 */
            });

    }

    return (
        <div className='postBlock'>
            <img src={props.post.user.avatar_url} alt="User's avatar" className='postAvatar' />
            <p className='postUserName'>{props.post.user.username}</p>
            <p className='postTime'><time dateTime={props.post.created_at}>{props.post.created_at.substring(0, 10)}</time></p>
            <p className='postContent'>{props.post.content}</p>
            <p className='postLikes'>{props.post.likes.length}</p>

            {/* The delete button will be displayd only under the user's own posts */}
            {props.post.user.username === /* JSON.parse(localStorage.getItem('user-info')) */props.user.username && 
            <button className='deletePostBtn' onClick={() => { deletePost() }} >Delete post</button>}

        </div>

    )
}

export default Post;