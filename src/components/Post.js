import React from 'react';
import './Post.css';

function Post(props) {


    return (
        <div className='postBlock'>
            <img src={props.post.user.avatar_url} alt="User's avatar" className='postAvatar' />
            <p className='postUserName'>{props.post.user.username}</p>
            <p className='postTime'><time dateTime={props.post.created_at}>{props.post.created_at.substring(0, 10)}</time></p>
            <p className='postContent'>{props.post.content}</p>
            <p className='postLikes'>{props.post.likes.length}</p>
        </div>

    )
}

export default Post;