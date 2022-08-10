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
        type='text'
        id='username'
        name='username'
        value={name || ''} 
        onChange={handleName}
      >
        Name
      </FormInput>
      <FormInput 
        type='email'
        id='email'
        name='email'
        value={email || ''} 
        onChange={handleEmail}
      >
        Email
      </FormInput>
      <Button type='submit'>
        Update
      </Button>
    </FormContainer>  
  );
}

export default ProfileUpdate;