import React, { useState } from 'react';
import FormContainer from '../FormContainer/FormContainer';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import './Register.css';

const Register = () => {
  const onSubmit = (username, email, password) => console.log(username, email, password);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='register'>
      <Logo />
      <FormContainer
        title='Welcome!'
        question='Already have an account?'
        link='signin'
        linkName='Login'
        onSubmit={event => {
          onSubmit(username, email, password);
          event.preventDefault();
        }}
      >
        {/* USERNAME */}
        <InputField 
          type='text'
          id='username'
          name='username'
          value={username} 
          onChange={setUsername}
        >
          Username
        </InputField>
        {/* EMAIL */}
        <InputField
          type='email'
          id='email'
          name='email'
          value={email} 
          onChange={setEmail}
        >
          Email
        </InputField>
        {/* PASSWORD */}
        <InputField 
          type='password'
          id='password'
          name='password'
          value={password} 
          onChange={setPassword}
        >
          Password
        </InputField>
        <p className='form__error'>error message</p>
        {/* BUTTON */}
        <Button type="submit">
          Sign up
        </Button>
      </FormContainer>
    </div>
  );
};

export default Register;
