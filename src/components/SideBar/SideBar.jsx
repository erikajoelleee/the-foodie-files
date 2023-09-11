import { Link } from "react-router-dom";
import { useState } from "react";
import * as userService from "../../utilities/users-service";

import appetizerIcon from "../../stylesheets/nachos_mexican_food_food_appetizer_icon_207920 (1).png";
import sideIcon from "../../stylesheets/salad_2515150.png";
import mainIcon from "../../stylesheets/dish.png";
import dessertIcon from "../../stylesheets/dessert_4421199.png";
import partyTrayIcon from "../../stylesheets/appetizer.png";
import homeIcon from "../../stylesheets/ufo.png"; 
import logoutIcon from "../../stylesheets/Screenshot_2023-09-11_at_3.30.25_PM-removebg-preview.png"; 

import "./SideBar.css";

export default function SideBar({ user, setUser }) {
  const [activeMenu, setActiveMenu] = useState("home");

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const getSidebarClassName = (menu) => {
    return activeMenu === menu ? "active" : "";
  };

  const handleSidebarClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <section className="sidebar">
      <Link to="/home" className="brand">
        <img
          src="https://i.imgur.com/1h1rFpZ.png"
          alt="The Foodie Files"
          className="sidebar-logo"
          style={{ width: "30vh", height: "auto" }}
        />
      </Link>
      <ul className="side-menu top">
        <li className={getSidebarClassName("home")}>
          <Link
            to="/home"
            className="sidebar-home"
            onClick={() => handleSidebarClick("home")}
          >
            <img src={homeIcon} alt="Home Icon" className="category-icon" /> {/* Use your custom home icon */}
            <span className="sidebar-text">Home</span>
          </Link>
        </li>
        <li className="sidebar-separator"></li>
        <li className={getSidebarClassName("appetizer")}>
          <Link
            to="/posts/category/appetizer"
            className="sidebar-appetizer"
            onClick={() => handleSidebarClick("appetizer")}
          >
            <img
              src={appetizerIcon}
              alt="Appetizer Icon"
              className="category-icon"
            />
            <span className="sidebar-text">Appetizer</span>
          </Link>
        </li>
        <li className={getSidebarClassName("side")}>
          <Link
            to="/posts/category/side"
            className="sidebar-side"
            onClick={() => handleSidebarClick("side")}
          >
            <img src={sideIcon} alt="Side Icon" className="category-icon" />
            <span className="sidebar-text">Side</span>
          </Link>
        </li>
        <li className={getSidebarClassName("main")}>
          <Link
            to="/posts/category/main"
            className="sidebar-main"
            onClick={() => handleSidebarClick("main")}
          >
            <img src={mainIcon} alt="Main Icon" className="category-icon" />
            <span className="sidebar-text">Main</span>
          </Link>
        </li>
        <li className={getSidebarClassName("dessert")}>
          <Link
            to="/posts/category/dessert"
            className="sidebar-dessert"
            onClick={() => handleSidebarClick("dessert")}
          >
            <img
              src={dessertIcon}
              alt="Dessert Icon"
              className="category-icon"
            />
            <span className="sidebar-text">Dessert</span>
          </Link>
        </li>
        <li className={getSidebarClassName("party-tray")}>
          <Link
            to="/posts/category/party-tray"
            className="sidebar-party-tray"
            onClick={() => handleSidebarClick("party-tray")}
          >
            <img
              src={partyTrayIcon}
              alt="Party Tray Icon"
              className="category-icon"
            />
            <span className="sidebar-text">Party Tray</span>
          </Link>
        </li>
        </ul>
      <ul className="side-menu">
        <li>
          <Link to="" onClick={handleLogOut} className="logout-link">
            <img src={logoutIcon} alt="Logout Icon" className="logout-icon" /> {/* Use your custom logout icon */}
            <span className="sidebar-text">Log out</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
