import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  generateClassName = (value) => {
    return `auth-input-group ${value !== '' ? 'active' : ''}`;
  }

  handleSignupOrLogin = async (evt) => {
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      const user = await signUp(formData);
      this.props.setUser(user);
      // redirect to home
      window.location.href = '/home';
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again' });
    } 
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    this.handleSignupOrLogin();
  };

  render() {
    const { name, email, password, confirm } = this.state;
    const disable = this.state.password !== this.state.confirm;

    return (
      <>
        <div className="auth-page-form-column">
          <div className="auth-form-container">
            <form autoComplete="off" onSubmit={this.handleSubmit} className="auth-form">
              <div className={this.generateClassName(name)}>
                <AiOutlineUser className="auth-icon"/>
                <input type="text" name="name" placeholder="Username" value={this.state.name} onChange={this.handleChange} required className="auth-input-field" />
              </div>
              <div className={this.generateClassName(email)}>
                <AiOutlineMail className="auth-icon" />
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required className="auth-input-field" />
              </div>
              <div className={this.generateClassName(password)}>
                <AiOutlineLock className="auth-icon" />
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required className="auth-input-field" />
              </div>
              <div className={this.generateClassName(confirm)}>
                <AiOutlineLock className="auth-icon" />
                <input type="password" name="confirm" placeholder="Confirm Password" value={this.state.confirm} onChange={this.handleChange} required className="auth-input-field" />
              </div>
              <button type="submit" disabled={disable} className="auth-button">SIGN UP</button>
              <p className="error-message">&nbsp;{this.state.error}</p>
            </form>
          </div>
        </div>
      </>
    );
  }
}