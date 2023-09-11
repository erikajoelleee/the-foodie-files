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

    useEffect(() => {
        async function fetchPost() {
          try {
            const fetchedPost = await postsAPI.fetchPostById(postId);
            setPost(fetchedPost);
            setOriginalPost(fetchedPost);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchPost().catch((error) => {
          console.error(error);
        });
      }, [postId]);

    const handleLike = () => {
        setLikeClicked(!likeClicked);
        setDislikeClicked(false);
    };

    const handleDislike = () => {
        setDislikeClicked(!dislikeClicked);
        setLikeClicked(false);
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
    }

    const updatePost = async (updatedPost) => {
        console.log(updatedPost);
        try {
            setEditing(false);
            setPost({...post, category: updatedPost.category, title: updatedPost.title, content: updatedPost.content });
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

    // testing to see if the userId and postId match
    // console.log(`currentUserId = ${currentUser}, postUserId = ${postUserId}`);

    return (
        <div className="post-page">
            <div className="post-on-postpage">
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
                    <div className="postpage-content-div">
                        <p className="post-page-content">{post.content}</p>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}