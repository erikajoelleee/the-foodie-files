import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { IoAddCircleOutline } from 'react-icons/io5';
import './NavBar.css';

export default function NavBar({ user }) {
  const [isTyping, setIsTyping] = useState(false);

  const handleSearchInputChange = (evt) => {
    setIsTyping(evt.target.value.trim() !== '');
  };

  return (
    <section className="navbar-content">
      <nav className="navbar">
        <div className="nav-search-div">
          <form>
            <input 
              type="search" 
              placeholder="Search The Foodie Files" 
              className="nav-search-input" 
              onChange={handleSearchInputChange}
            />
            <button 
              type="submit" 
              className="nav-search-btn"
              style={{ color: isTyping ? 'white' : 'rgb(109, 110, 112)' }}
            >
              <AiOutlineSearch />
            </button>
          </form>
          <span className="add-post-button">
            <Link to="/posts/new" className="new-post-hyperlink">
              <IoAddCircleOutline className="new-post-button" />
              <span className="new-post-text">New Post</span>
            </Link>
          </span>
        </div>
        <span className="user-profile-name">
          <span className="user-icon"><AiOutlineUser /></span>
          {user.name}
        </span>
      </nav>
    </section>
  );
}
