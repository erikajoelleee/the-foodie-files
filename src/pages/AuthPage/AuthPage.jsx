import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LogInForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';

export default function AuthPage({ setUser }) {
  const [activeTab, setActiveTab] = useState('login');
  let navigate = useNavigate();

  async function handleSignupOrLogin() {
    navigate('/home');
  }

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  return (
    <>
      <main className="auth-page-main">
        <h1 className="legends-lounge-h1">LEGENDS LOUNGE</h1>
        <div className="signup-rectangle">
          <div className="auth-page-container">
            <div className="auth-tabs" role="tablist">
              <span 
                className={`tab-login ${activeTab === 'login' ? 'active' : ''}`} 
                role="tab" 
                onClick={() => handleTabClick('login')}
              >
                <p className="auth-hyper-link">Log in</p>
              </span>
              <span 
                className={`tab-signup ${activeTab === 'signup' ? 'active' : ''}`}
                role="tab" 
                onClick={() => handleTabClick('signup')}
              >
                <p className="auth-hyper-link">Sign up</p>  
              </span>
            </div>
            
            { activeTab === 'signup' ?
                <SignUpForm setUser={setUser} handleSignupOrLogin={handleSignupOrLogin} />
                :
                <LogInForm setUser={setUser} handleSignupOrLogin={handleSignupOrLogin} />
            }
          </div>
        </div>
      </main>
    </>
  );
}