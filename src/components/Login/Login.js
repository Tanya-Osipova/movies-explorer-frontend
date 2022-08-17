import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as userAuth from '../../utils/userAuth.js';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import PopupMessage from '../PopupMessage/PopupMessage.js';
import useInput from '../../hooks/useInput.js';
import '../FormInput/FormInput.css';
import './Login.css';

function Login(props) {
  const email = useInput('', {isEmpty: true, isEmail: true})
  const password = useInput('', {isEmpty: true, minLength: 8})
  const [message, setMessage] = useState('')
  const [popupActive, setPopupActive] = useState(false)
  const history = useHistory();

  useEffect(() => {
    if (!message) return
    setPopupActive(true)
    const timer = setTimeout(() => {
      setPopupActive(false)
      setMessage('')
    }, 3000);
    return () => clearTimeout(timer) 
  }, [message])
  
  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault()
   
    userAuth.authorize(email.value, password.value)
      .then((data) => {
        if (data) {
          props.handleLogin(e)
          history.push('/movies')
        } else {
          setMessage('Error')
        }})
        .catch(err => setMessage(err.message))
  } 

  return (
    <div className='login'>
      <Logo />
      <FormContainer
        title='Nice to see you!'
        question='Not a member yet?'
        link='signup'
        linkName='Sign up'
        onSubmit={handleSubmit}
      >
        {/* EAMIL */}
        <FormInput
          type= "email"
          id='email'
          name='email'
          value={email.value} 
          onChange={e => email.onChange(e)}
          onBlur={e => email.onBlur(e)}
        >
          Email
        </FormInput>
        {(email.isError && email.isEmpty) && <p className='form__error-message'>Email is required!</p>}
        {(email.isError && email.emailError) && <p className='form__error-message'>Please enter a valid email!</p>}
        
        {/* PASSWORD */}
        <FormInput 
          type= "password"
          id='password'
          name='password'
          value={password.value} 
          onChange={e => password.onChange(e)}
          onBlur={e => password.onBlur(e)}
        >
          Password
        </FormInput>
        {(password.isError && password.isEmpty) && <p className='form__error-message'>Password is required!</p>}
        {(password.isError && password.minLengthError) && <p className='form__error-message'>Password must be at least 8 characters</p>}

        {/* BUTTON */}
        <Button 
          type="submit" 
          className="button"
          disabled={!email.inputValid || !password.inputValid} 
        >
          Login
        </Button>
      </FormContainer>
        
      {/* POPUP MESSAGE */}
      <PopupMessage 
        message={message}
        popupActive={popupActive}
        setPopupActive={setPopupActive}
      />
    </div>
  )
}

export default Login;
