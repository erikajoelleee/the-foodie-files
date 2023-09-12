import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { PiArrowFatUpBold, PiArrowFatDownBold } from 'react-icons/pi';
import * as postsAPI from '../../utilities/posts-api';

export default function CategoryPage() {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await postsAPI.fetchPostsByCategory(category);
        const sortedPosts = fetchedPosts.sort((a, b) => b._id.localeCompare(a._id));
        setPosts(sortedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [category]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/upvote`, {
        method: 'POST',
      });

      if (response.ok) {
        // Update the likes count in the state
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      } else {
        console.error('Failed to upvote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}/downvote`, {
        method: 'POST',
      });

      if (response.ok) {
        // Update the dislikes count in the state
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
          )
        );
      } else {
        console.error('Failed to downvote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="home-page">
      <h1 className="home-page-header">{`Welcome to the ${category} page`}</h1>
      {posts.length === 0 ? (
        <h3 className="Loading-post-page">Loading...</h3>
      ) : (
        posts.map((post) => {
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
                  <div className="postpage-buttons">
                    <div className="vertical-buttons">
                      <button onClick={() => handleLike(post._id)} className="like-button">
                        <PiArrowFatUpBold className="liked-icon" />
                      </button>
                      <span className="like-count">{post.likes}</span>
                      <button onClick={() => handleDislike(post._id)} className="dislike-button">
                        <PiArrowFatDownBold className="disliked-icon" />
                      </button>
                      <span className="dislike-count">{post.dislikes}</span>
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
        })
      )}
    </div>
  );
}
