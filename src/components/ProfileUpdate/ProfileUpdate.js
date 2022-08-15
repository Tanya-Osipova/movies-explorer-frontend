import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';

function ProfileUpdate(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      email,
    })
  } 

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    props.setActive(false);
  }, [currentUser]);

  return (
    <FormContainer
      title='Update Profile!'
      link=''
      onSubmit={handleSubmit} 
    >
      <FormInput 
        props={{ type: "text", minLength: "2", maxLength: "30", required: true }}
        id='username'
        name='username'
        value={name || ''} 
        onChange={handleName}
        validators={["valueMissing", "tooShort", "tooLong"]}
        errorMessage="Username is required! Username must be between 2 and 30 characters!"
      >
        Name
      </FormInput>
      <FormInput 
        props={{ type: "email", required: true }}
        id='email'
        name='email'
        value={email || ''} 
        onChange={handleEmail}
        validators={["typeMismatch", "valueMissing"]}
        errorMessage="Email is required! Please enter a valid email!"
      >
        Email
      </FormInput>
      <Button type='submit' className="button">
        Update
      </Button>
    </FormContainer>  
  );
}

export default ProfileUpdate;