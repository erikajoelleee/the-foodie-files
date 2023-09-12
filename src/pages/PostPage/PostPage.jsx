import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import EditPostForm from '../../components/EditPostForm/EditPostForm';
import * as postsAPI from '../../utilities/posts-api';
import { PiArrowFatUpBold, PiArrowFatDownBold } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import './PostPage.css';

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const currentUser = getUser()._id;
  const postUserId = post?.user._id;
  const [originalPost, setOriginalPost] = useState(null);
  const [votes, setVotes] = useState(0); // Initialize votes count

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await postsAPI.fetchPostById(postId);
        setPost(fetchedPost);
        setOriginalPost(fetchedPost);
        setVotes(fetchedPost.likes - fetchedPost.dislikes); // Calculate votes
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost().catch((error) => {
      console.error(error);
    });
  }, [postId]);

  const handleLike = async () => {
    setLikeClicked(!likeClicked);
    setDislikeClicked(false);

    try {
      const response = await fetch(`/api/posts/${postId}/upvote`, {
        method: 'POST',
      });

      if (response.ok) {
        setVotes(votes + 1); // Increment votes count
      } else {
        console.error('Failed to upvote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDislike = async () => {
    setDislikeClicked(!dislikeClicked);
    setLikeClicked(false);

    try {
      const response = await fetch(`/api/posts/${postId}/downvote`, {
        method: 'POST',
      });

      if (response.ok) {
        setVotes(votes - 1); // Decrement votes count
      } else {
        console.error('Failed to downvote');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = () => {
    if (currentUser === postUserId) {
      setEditing(!editing);
    } else {
      console.log('Unauthorized to edit this post.');
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setPost(originalPost);
  };

  const updatePost = async (updatedPost) => {
    console.log(updatedPost);
    try {
      setEditing(false);
      setPost({ ...post, category: updatedPost.category, title: updatedPost.title, content: updatedPost.content });
    } catch (error) {
      console.error(error);
    }
  };

  const createdAtDate = post?.createdAt ? new Date(post.createdAt) : null;
  const formattedDate = createdAtDate ? createdAtDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }) : null;
  const formattedTime = createdAtDate ? createdAtDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : null;

  if (!post) {
    return <h3 className="Loading-post-page">Loading...</h3>;
  }

  // Split the content into sections
  const contentSections = post.content.split('\n\n');
  const description = contentSections[0];
  const ingredients = contentSections[1] ? contentSections[1].split('\n') : [];
  const directions = contentSections[2] ? contentSections[2].split('\n') : [];
  const finalThoughts = contentSections[3] ? contentSections[3].split('\n') : [];

  return (
    <div className="post-page">
      <div className="post-on-postpage">
        <div className="postpage-buttons">
          <div className="vertical-buttons">
            <button onClick={handleLike} className={`like-button ${likeClicked ? 'liked' : ''}`} title="Like">
              {likeClicked ? <PiArrowFatUpBold className="liked-icon" /> : <PiArrowFatUpBold />}
            </button>
            <span className="like-count">{votes > 0 ? `+${votes}` : votes}</span>
            <button onClick={handleDislike} className={`dislike-button ${dislikeClicked ? 'disliked' : ''}`} title="Dislike">
              {dislikeClicked ? <PiArrowFatDownBold className="disliked-icon" /> : <PiArrowFatDownBold />}
            </button>
          </div>
        </div>

        {/* Display content/input fields based on editing state */}
        {editing ? (
          <EditPostForm post={post} updatePost={updatePost} handleCancel={handleCancel} />
        ) : (
          <div className="post-page-rest-of-post">
            <div className="postedBy-postpage-div">
              <h6 className="post-page-category">{`/${post.category}`}</h6>
              <h6 className="post-page-user">{`Posted by: ${post.user.name}`}</h6>
              {currentUser === postUserId && (
                <div className="edit-options">
                  <button onClick={handleEdit} className="edit-button-postpage" title="Edit">
                    {<AiOutlineEdit />}
                  </button>
                </div>
              )}
            </div>
            <div className="post-page-created-div">
              <h6 className="post-page-created-at">{`Created: ${formattedDate} at ${formattedTime}`}</h6>
            </div>
            <div className="postpage-title-div">
              <h3 className="post-page-title">{post.title}</h3>
            </div>

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
        )}
      </div>
    </div>
  );
}
