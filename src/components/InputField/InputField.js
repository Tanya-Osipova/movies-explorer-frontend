import React from 'react';
import './InputField.css';

const InputField = ({ type, id, name, children, value, onChange }) => (
  <label className='form__label'>
    {children}
    <input
      className='form__input'
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={event => onChange(event.target.value)}
    />
  </label>
);

export default InputField;