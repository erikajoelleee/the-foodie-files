import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as postsAPI from '../../utilities/posts-api';
import { PiArrowFatUpBold, PiArrowFatDownBold } from 'react-icons/pi';
import './HomePage.css';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (location.pathname === '/home') {
                    const fetchedPosts = await postsAPI.fetchPosts();
                    const sortedPosts = fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);
                    console.log(sortedPosts)
                    setPosts(sortedPosts);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, [location.pathname]);

    const handleLike = () => {
        setLikeClicked(!likeClicked);
        setDislikeClicked(false);
    };

    const handleDislike = () => {
        setDislikeClicked(!dislikeClicked);
        setLikeClicked(false);
    };

    return (
        <div className="home-page">
            <h1 className="home-page-header">Welcome to The Foodie Files</h1>
            <h3 className="sub-header">The Recipe is out There</h3>
            {posts.map((post) => {
                const createdAtDate = new Date(post.createdAt);
                const formattedDate = createdAtDate.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                });
                const formattedTime = createdAtDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                });

                // Split the content into sections
                const contentSections = post.content.split('\n\n');
                const description = contentSections[0];
                const ingredients = contentSections[1] ? contentSections[1].split('\n') : [];
                const directions = contentSections[2] ? contentSections[2].split('\n') : [];
                const finalThoughts = contentSections[3] ? contentSections[3].split('\n') : [];

                return (
                    <Link to={`/posts/${post._id}`} key={post._id} className="post-link">
                        <div className="post-page">
                            <div className="post-on-postpage">
                                <span>{ post.likes }</span>
                                <div className="postpage-buttons">
                                    <div className="vertical-buttons">
                                        <button onClick={handleLike} className={`like-button ${likeClicked ? 'liked' : ''}`} title="Like">
                                            {likeClicked ? <PiArrowFatUpBold className="liked-icon" /> : <PiArrowFatUpBold />}
                                        </button>
                                        <button onClick={handleDislike} className={`dislike-button ${dislikeClicked ? 'disliked' : ''}`} title="Dislike">
                                            {dislikeClicked ? <PiArrowFatDownBold className="disliked-icon" /> : <PiArrowFatDownBold />}
                                        </button>
                            
                                    </div>
                                </div>
                                <div className="post-page-rest-of-post">
                                    <div className="postedBy-postpage-div">
                                        <h6 className="post-page-category">{`/${post.category}`}</h6>
                                        <h6 className="post-page-user">{`Posted by: ${post.user.name}`}</h6>
                                    </div>
                                    <div className="post-page-created-div">
                                        <h6 className="post-page-created-at">{`Created: ${formattedDate} at ${formattedTime}`}</h6>
                                    </div>
                                    <div className="postpage-title-div">
                                        <h3 className="post-page-title">{post.title}</h3>
                                    </div>
                                    <div className="postpage-content-div">
                                        {/* Description */}
                                        <div className="post-description">
                                            <h4>Description</h4>
                                            <p>{description}</p>
                                        </div>
                                        {/* Ingredients */}
                                        <div className="post-ingredients">
                                            <h4>Ingredients</h4>
                                            <ul>
                                                {ingredients.map((ingredient, index) => (
                                                    <li key={index}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Directions */}
                                        <div className="post-directions">
                                            <h4>Directions</h4>
                                            <ul>
                                                {directions.map((direction, index) => (
                                                    <li key={index}>{direction}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Final Thoughts */}
                                        <div className="post-final-thoughts">
                                            <h4>Final Thoughts</h4>
                                            {finalThoughts.map((thought, index) => (
                                                <p key={index}>{thought}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
