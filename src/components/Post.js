import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';

function Post(props) {

    const [likesCount, setLikesCount] = useState(props.post.likes.length);
    const [doesUserLiked, setDoesUserLiked] = useState(
        props.post.likes.filter((like) => like.username === props.user.username).length !== 0
    );

    const likePost = (id, isLiked) => {
        /* console.log(id, isLiked); */
        axios.post("http://akademia108.pl/api/social-app/post/" + (isLiked ? "dislike" : "like"),
            {
                post_id: id,
            })
            .then((response) => {
                console.log(response);
                if (response.data.liked) {
                    setLikesCount(likesCount + 1);
                    setDoesUserLiked(true);
                }
                if (!response.data.liked) {
                    setLikesCount(likesCount - 1);
                    setDoesUserLiked(false);
                }
            })
            .catch((err) => { console.error(err) });
    }



    const unfollow = (id) => {

        axios.post("https://akademia108.pl/api/social-app/follows/disfollow",
            {
                leader_id: id,
            })
            .then(() => {
                /* console.log(response); */
                props.getLatestPosts();
            })
            .catch((err) => { console.error(err) });
    }



    return (
        <div className='postBlock'>
            <img src={props.post.user.avatar_url} alt="User's avatar" className='postAvatar' />
            <p className='postUserName'>{props.post.user.username}</p>
            <p className='postTime'><time dateTime={props.post.created_at}>{props.post.created_at.substring(0, 10)}</time></p>
            <p className='postContent'>{props.post.content}</p>
            <p className='postLikes'>{likesCount}</p>

            {/* The delete button will be displayd only under the user's own posts */}
            {props.post.user.username === /* JSON.parse(localStorage.getItem('user-info')) */props.user.username &&
                <button className='deletePostBtn' onClick={() => { props.setDeletePostId(props.id) }} >Delete post</button>}


            {/* Displayed only for logged in user*/}
            {props.user &&
                <button className='likePostBtn' onClick={() => { likePost(props.post.id, doesUserLiked) }} >
                    {
                        doesUserLiked ? 'Dislike' : 'Like'
                    }
                </button>}
            {(props.post.user.username !== props.user.username && props.user) &&
                <button className='followBtn, likePostBtn' onClick={() => { unfollow(props.post.user.id) }}>
                    Unfollow
                </button>
            }

        </div>

    )
}

export default Post;