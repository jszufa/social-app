import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FollowRecommendations.css';

function FollowRecommendations(props) {

    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => { getRecommendations(); }, []);

    const getRecommendations = () => {

        axios.post(`https://akademia108.pl/api/social-app/follows/recommendations`)
            .then((response) => {
                console.log(response);
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

        /* PROBLEM -kiedy w tablicy rekomendacji są mniej niż 3 elementy buguje się */

        recommendations &&
        <ul className='followRecommendationsList'>
            <li>
                <img src={recommendations[0].avatar_url} alt="User's avatar" className='followAvatar' />
                <p className='followUserName'>{recommendations[0].username}</p>
                <button className='followBtn' onClick={() => { follow(recommendations[0].id) }}>
                    Follow
                </button>
            </li>
            <li>
                <img src={recommendations[1].avatar_url} alt="User's avatar" className='followAvatar' />
                <p className='followUserName'>{recommendations[1].username}</p>
                <button className='followBtn' onClick={() => { follow(recommendations[1].id) }}>
                    Follow
                </button>
            </li>
            {<li>
                <img src={recommendations[2].avatar_url} alt="User's avatar" className='followAvatar' />
                <p className='followUserName'>{recommendations[2].username}</p>
                <button className='followBtn' onClick={() => { follow(recommendations[2].id) }}>
                    Follow
                </button>
            </li>}
        </ul>

    );
}

export default FollowRecommendations;