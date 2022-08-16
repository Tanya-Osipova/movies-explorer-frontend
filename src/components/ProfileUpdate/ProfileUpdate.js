import React, { useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import useInput from '../../hooks/useInput';
import '../FormInput/FormInput.css';

function ProfileUpdate(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const email = useInput('', {isEmpty: true, isEmail: true})
  const name = useInput('', {isEmpty: true, minLength: 2, maxLength: 30} )

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name.value,
      email: email.value,
    })
  }

  useEffect(() => {
    name.updateValue = currentUser.name
    email.updateValue = currentUser.email
    props.setActive(false);
  }, [currentUser]);

  return (
    <FormContainer
      title='Update Profile!'
      link=''
      onSubmit={handleSubmit} 
    >
      <FormInput 
        type= "text"
        id='username'
        name='username'
        value={name.value} 
        onChange={e => name.onChange(e)}
        onBlur={e => name.onBlur(e)}      
      >
        Name
      </FormInput>
      {(name.isError && name.isEmpty) && <p className='form__error-message'>Username is required!</p>}
      {(name.isError && (name.minLengthError || name.maxLengthError)) && <p className='form__error-message'>Username must be between 2 and 30 characters!</p>}
      
      <FormInput 
        type='email'
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
        
      <Button 
        type='submit' 
        className="button" 
        disabled={!email.inputValid || !name.inputValid} 
      >
        Update
      </Button>
    </FormContainer>  
  );
}

export default ProfileUpdate;