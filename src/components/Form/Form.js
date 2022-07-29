import React, { useState } from 'react';

export const UsernameForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');

  return (
    <Form
      onSubmit={event => {
        onSubmit(username);
        event.preventDefault();
      }}
    >
      
      <InputField
        value={username}
        onChange={setUsername}
      >
        Name:
      </InputField>

      <Button type="submit">Send</Button>
    </Form>
  )
}

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    {children}
  </form>
)

export const Button = ({ type='button', children, onClick }) => {
  <button type={type} onClick={onClick}>
    {children}
  </button>
}

export const InputField = ({ value, onChange, children }) => (
  <label>
    {children}
    <input 
      type='text'
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  </label>
)

export default Form;