import React, { useState, useEffect, useRef } from 'react';
// import { useHistory } from 'react-router';
import { BiTrash } from 'react-icons/bi';
import * as postsAPI from '../../utilities/posts-api';
import { useNavigate } from 'react-router-dom';

const EditPostForm = ({ post, updatePost, handleCancel }) => {
  const navigate = useNavigate();
  const [editedPost, setEditedPost] = useState({
    category: post.category,
    title: post.title,
    content: post.content,
    id: post._id,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const titleRef = useRef(null);
  const contentRef = useRef(null);
//   const history = useHistory();

  const adjustElementSize = (ref) => {
    const element = ref.current;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }

  const adjustContentHeight = () => {
    adjustElementSize(contentRef);
  }

  useEffect(() => {
    adjustElementSize(titleRef);
    adjustElementSize(contentRef);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'title') {
      adjustElementSize(titleRef);
    } else if (name === 'content') {
      adjustContentHeight();
    }
  };

  const handleDelete = () => {
    setShowConfirmation(true);
  }
  
  const handleDeleteConfirm = async () => {
    await postsAPI.deletePost(editedPost.id);
    navigate('/home');
  }

  const handleDeleteCancel = () => {
    setShowConfirmation(false);
    adjustContentHeight();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await postsAPI.updatePost(editedPost);
      updatePost(updatedPost);
    } catch(error) {
      console.error(error);
    }
  };

  if (showConfirmation) {
    return (
      <div className="delete-confirmation-overlay">
        <div className="delete-confirmation-dialog">
          <p className="delete-confirmation-paragraph">Are you sure you want to delete?</p>
          <div className="delete-confirmation-buttons">
            <button className="delete-confirm-button" onClick={handleDeleteConfirm}>Yes, Delete</button>
            <button className="delete-cancel-button" onClick={handleDeleteCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
        <div className="edit-post-form-container">
          <form className="edit-post-form" onSubmit={handleSubmit}>
            <div className="edit-category-div">
              <div className="edit-field-category">
                <label className="edit-category">Category: </label>
              </div>
              <select name="category" className="edit-category-option" value={editedPost.category} onChange={handleChange}>
                <option value="top">Top Lane</option>
                <option value="jungle">Jungle</option>
                <option value="mid">Mid Lane</option>
                <option value="adc">ADC</option>
                <option value="support">Support</option>
              </select>
              <button className="delete-post-button" title="Delete post" onClick={handleDelete}>
                <BiTrash />
              </button>
            </div>
      
            <div className="edit-title-div">
              <div className="edit-field-title">
                <label className="edit-title">Title: </label>
              </div>
              <input 
                ref={titleRef}
                style={{ height: 'auto' }} // As per your usage in the code
                type="text" 
                className="edit-title-text" 
                name="title" 
                value={editedPost.title} 
                onChange={handleChange} 
              />
            </div>
      
            <div className="edit-content-div">
              <div className="edit-field-content">
                <label className="edit-content">Content: </label>
              </div>
              <textarea 
                ref={contentRef}
                style={{ height: 'auto' }} // As per your usage in the code
                className="edit-content-text" 
                name="content" 
                value={editedPost.content} 
                onChange={handleChange} 
              />
            </div>
      
            <div className="save-button-edit">
              <button type="submit" className="save-changes-button">
                Save Changes
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
  }
}

export default EditPostForm;