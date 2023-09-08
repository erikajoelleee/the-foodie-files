import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import PostPage from '../PostPage/PostPage';
import CategoryPage from '../CategoryPage/CategoryPage';
import HomePage from '../HomePage/HomePage';
import WelcomePage from '../WelcomePage/WelcomePage';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ? (
          <>
          <div className="app-container">
            <SideBar user={user} setUser={setUser} />
            <div className="main-content">
              <NavBar user={user} setUser={setUser} />
              <div className="centered-content">
                <Routes>
                  {/* Route components in here */}
                  <Route path="/home" element={<HomePage user={user} />} />
                  <Route path="/posts/new" element={<NewPostPage user={user} />} />
                  <Route path="/posts/:postId" element={<PostPage user={user} />} />
                  <Route path="/posts/category/:category" element={<CategoryPage user={user} />} />
                </Routes>
              </div>
            </div>
          </div>
          </>
      ) : (
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/credentials" element={<AuthPage setUser={setUser} />} />
        </Routes>
      )}
    </main>
  );
}