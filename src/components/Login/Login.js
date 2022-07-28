import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Login.css';

function Login() {
  return (
    <div className="form">
      <Logo />
      <p className="form__title">
        Nice to see you!
      </p>
      <form className="form__container">
        {/* Email */}
        <label className="form__label" htmlFor="email">
          Email
        </label>
        <input 
          className="form__input"
          type="email" 
          id="email" 
          name="email" 
        />
        {/* Password */}
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input 
          className="form__input"
          type="password" 
          id="password" 
          name="password" 
        />
        <SubmitButton>Login</SubmitButton>
      </form>
      <div className="form__link-container">
        <p className="form__question">
          Not a member yet?
        </p>
        <Link className="form__link" to="signup">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
