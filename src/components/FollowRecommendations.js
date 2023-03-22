import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowRecommendations.css';

function FollowRecommendations(props) {

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => { getRecommendations(); }, []);

    const getRecommendations = () => {

        axios.post(`https://akademia108.pl/api/social-app/follows/recommendations`)
            .then((response) => {
                /* console.log(response); */
                setRecommendations(response.data);
            })
            .catch((err) => { console.error(err) });
    }



    const follow = (id) => {

        axios.post("https://akademia108.pl/api/social-app/follows/follow",
            {
                leader_id: id,
            })
            .then((response) => {
                /* console.log(response); */
                getRecommendations();
                props.getLatestPosts();
            })
            .catch((err) => { console.error(err) });
    }


    return (

        /* mapowanie */
        <ul className='followRecommendationsList'>
            {recommendations.map((recUser) => {
                return (
                    <li key={`${recUser.id}`}>
                        <img src={recUser.avatar_url} alt="User's avatar" className='followAvatar' />
                        <p className='followUserName'>{recUser.username}</p>
                        <button className='followBtn' onClick={() => { follow(recUser.id) }}>
                            Follow
                        </button>
                    </li>
                )
            })}
        </ul>

    );
}

export default FollowRecommendations;