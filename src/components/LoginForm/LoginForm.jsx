import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

export default function LogInForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  const generateClassName = (value) => {
    return `auth-input-group ${value !== '' ? 'active' : ''}`;
  }

  const handleSignupOrLogin = async () => {
    try {
      const user = await usersService.login(credentials);
      setUser(user);
      // redirect to home page
      window.location.href = '/home';
    } catch {
      setError('Log In Failed - Try Again');
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSignupOrLogin();
  }

  return (
    <>
      <div className="auth-page-form-column">
        <div className="auth-form-container">
          <form autoComplete="off" onSubmit={handleSubmit} className="auth-form">
            <div className={generateClassName(credentials.email)}>
              <AiOutlineMail className="auth-icon" />
              <input type="text" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required className="auth-input-field" />
            </div>
            <div className={generateClassName(credentials.password)}>
              <AiOutlineLock className="auth-icon" />
              <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required className="auth-input-field" />
            </div>
            <button type="submit" className="auth-button">LOG IN</button>
            <p className="error-message">&nbsp;{error}</p>
          </form>
        </div>
      </div>
    </>
  );
}