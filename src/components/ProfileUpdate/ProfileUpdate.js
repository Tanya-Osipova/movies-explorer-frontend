import React, { useEffect } from 'react';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import useInput from '../../hooks/useInput';
import '../FormInput/FormInput.css';

function ProfileUpdate(props) {
  const email = useInput('', {isEmpty: true, isEmail: true})
  const name = useInput('', {isEmpty: true, minLength: 2, maxLength: 30} )
  const [message, setMessage] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      email: email.value,
      name: name.value,
    })
  }

  // UPDATE FIELDS ON POPUP OPEN
  useEffect(() => {
    email.updateValue(props.user.email);
    name.updateValue(props.user.name);
  }, [props.active]);


  //MESSAGE SUCCESSFUL CHANGE OF NAME
  useEffect(() => {
    setMessage('Updated successfully')
    const timer = setTimeout(() => {
      props.setActive(false)
      setMessage('')
    }, 3000);
    return () => clearTimeout(timer)
  }, [props.user.name]);

  return (
    <FormContainer
      title='Update Profile!'
      link=''
      onSubmit={handleSubmit} 
    >
      {/* USERNAME */}
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
      
      {/* EMAIL */}
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
        {message}

      {/* BUTTON */}
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