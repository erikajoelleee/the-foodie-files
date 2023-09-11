import React, { Component } from 'react';
import * as postsAPI from '../../utilities/posts-api';
 
export default class NewPostForm extends Component {
  state = {
    category: '',
    title: '',
    content: '',
    user: this.props.user,
    error: '',
    createdPost: null
  };

  contentRef = React.createRef();

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    },
    () => {
        this.adjustElementSize(this.contentRef);  
      }
    );
  };
  
  handleSubmit = async (evt) => {
    evt.preventDefault();
    const { category, title, content, user } = this.state;

    try {
        const postData = { 
          category, 
          title, 
          content, 
          user
        };

        const createdPost = await postsAPI.createPost(postData);
        console.log(createdPost);
        // redirect to created post page
        window.location.href = `/posts/${createdPost._id}`;
        
        this.setState({
          category: '',
          title: '',
          content: '',
          error: '',
        });
        

    } catch (error) {
        this.setState({ error: 'Creating post failed - Try Again' });
    }
  };

  adjustElementSize = (ref) => {
    const element = ref.current;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  };

  render() {
    const { category, title, content } = this.state;

    return (
        <div className="new-post-page">
          <div className="new-post-on-postpage">
            <div className="new-post-page-rest-of-post">
              <form onSubmit={this.handleSubmit} className="new-post-form">
                  <div className="edit-category-div">
                    <div className="edit-field-category">
                      <label className="edit-category">Category: </label>
                    </div>
                      <select name="category" value={category} onChange={this.handleChange} required className="edit-category-option">
                          <option value="">Choose a category</option>
                          <option value="appetizer">Appetizer</option>
                          <option value="side">Side</option>
                          <option value="main">Main</option>
                          <option value="dessert">Dessert</option>
                          <option value="party-tray">Party Tray</option>
                          <option value="drink">Drink</option>
                          </select>
                  </div>
                  <div className="edit-title-div">
                    <div className="edit-field-title">
                      <label className="edit-title">Title: </label>
                    </div>
                      <input 
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={this.handleChange} 
                        required 
                        placeholder="Title" 
                        className="edit-title-text" 
                      />
                  </div>
                  <div className="edit-content-div">
                    <div className="edit-field-content">
                      <label className="edit-content">Content: </label> 
                    </div>
                      <textarea 
                        name="content" 
                        value={content} 
                        onChange={this.handleChange} 
                        required 
                        className="edit-content-text" 
                        placeholder="Content" 
                        ref={this.contentRef}
                      />
                  </div>
                  <div className="new-post-form-group">
                      <button type="submit" className="create-post-btn">Create your post</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}