import React, { useEffect } from 'react';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import useInput from '../../hooks/useInput';
import '../FormInput/FormInput.css';

function ProfileUpdate(props) {
  const email = useInput('', {isEmpty: true, isEmail: true})
  const name = useInput('', {isEmpty: true, minLength: 2, maxLength: 30})
  const [sameData,setSameData] = React.useState(true)
  const [message, setMessage] = React.useState('')
  const [profileUpdated,setProfileUpdated] = React.useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    setSameData(true)
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

  useEffect(() => {
    if (!props.user.name) return
    setMessage(<p className='form__update-message'>Updated successfully!</p>)
    const timer = setTimeout(() => {
      props.setActive(false)
      setMessage('')
    }, 3000);
    return () => clearTimeout(timer)
  }, [props.user.name]);

  //Lock button
  useEffect(() => {
    if (name.value === props.user.name && email.value === props.user.email) {
      setSameData(true)
    } else {
      setSameData(false)
    }
  }, [email.value, name.value])

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
        disabled={!email.inputValid || !name.inputValid || sameData} 
      >
        Update
      </Button>
    </FormContainer>  
  );
}

export default ProfileUpdate;