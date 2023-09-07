import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as userService from '../../utilities/users-service';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import './SideBar.css';

export default function SideBar({ user, setUser }) {
    const [activeMenu, setActiveMenu] = useState('home');

    function handleLogOut() {
        userService.logOut();
        setUser(null);

    }

    const getSidebarClassName = (menu) => {
        return activeMenu === menu ? 'active' : '';
    };

    const handleSidebarClick = (menu) => {
        setActiveMenu(menu);
    }

  return (
    <>
        <section className="sidebar">
            <Link to="/home" className="brand">
                <span className="sidebar-the">
                    <h2>THE</h2>
                </span>
                <span className="sidebar-foodie">
                    <h2>FOODIE</h2>
                </span>
                <span className="sidebar-files">
                    <h2>FILES</h2>
                </span>
            </Link>
            <ul className="side-menu top">
                <li className={getSidebarClassName('home')}>
                    <Link to="/home" className="sidebar-home" onClick={() => handleSidebarClick('home')}>
                        <AiOutlineHome className="home-icon"/>
                        <span className="sidebar-text">Home</span>
                    </Link>
                </li>
                <li className="sidebar-separator"></li>
                <li className={getSidebarClassName('appetizer')}>
                    <Link to="/posts/category/appetizer" className="sidebar-appetizer" onClick={() => handleSidebarClick('appetizer')}>
                        <span className="sidebar-text">Appetizer</span>
                    </Link>
                </li>
                <li className={getSidebarClassName('side')}>
                    <Link to="/posts/category/side" className="sidebar-side" onClick={() => handleSidebarClick('side')}>
                        <span className="sidebar-text">Side</span>
                    </Link>
                </li>
                <li className={getSidebarClassName('main')}>
                    <Link to="/posts/category/main" className="sidebar-main" onClick={() => handleSidebarClick('main')}>
                        <span className="sidebar-text">Main</span>
                    </Link>
                </li>
                <li className={getSidebarClassName('dessert')}>
                    <Link to="/posts/category/dessert" className="sidebar-dessert" onClick={() => handleSidebarClick('dessert')}>
                        <span className="sidebar-text">Dessert</span>
                    </Link>
                </li>
                <li className={getSidebarClassName('party-tray')}>
                    <Link to="/posts/category/party-tray" className="sidebar-party-tray" onClick={() => handleSidebarClick('party-tray')}>
                        <span className="sidebar-text">Party Tray</span>
                    </Link>
                </li>
            </ul>
            <ul className="side-menu">
                <li>
                    <Link to="" onClick={handleLogOut} className="logout-link">
                        <BiLogOut className="logout-icon" />
                        <span className="sidebar-text">Log out</span>
                    </Link>
                </li>
            </ul>
        </section>
    </>
    
  );
}