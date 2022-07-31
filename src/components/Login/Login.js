import React, { useState } from 'react';
import FormContainer from '../FormContainer/FormContainer';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import './Login.css';

const Login = () => {
  const onSubmit = (email, password) => console.log(email, password);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='login'>
      <Logo />
      <FormContainer
        title='Nice to see you!'
        question='Not a member yet?'
        link='signup'
        linkName='Sign up'
        onSubmit={event => {
          onSubmit(email, password);
          event.preventDefault();
        }}
      >
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
        {/* BUTTON */}
        <Button type="submit">
          Login
        </Button>
      </FormContainer>
    </div>
  );
};

export default Login;
