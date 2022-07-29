import React  from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import SubmitButton from '../SubmitButton/SubmitButton';
import './Register.css';

function Register() {
  return (
    <div className="form">
      <Logo />
      <p className="form__title">
        Welcome!
      </p>
      <form className="form__container">
        {/* Name */}
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input 
          className="form__input"
          type="text" 
          id="username" 
          name="username" 
        />
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
          className="form__input form__input_error"
          type="password" 
          id="password" 
          name="password" 
        />
        <span className="form__error-message">Something went wrong</span>
        <SubmitButton>Sign up</SubmitButton>
      </form>
      <div className="form__link-container">
        <p className="form__question">
          Already have an account?
        </p>
        <Link className="form__link" to="signin">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
