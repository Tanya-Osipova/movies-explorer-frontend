import React from 'react';
import './FormInput.css';

const FormInput = ({ id, name, children, value, type, onChange, onBlur }) => {
  return (
    <>
      <label className='form__label'>
        {children}
        <input
          className='form__input'
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange} 
          onBlur={onBlur}
        />
      </label>
    </>
  )
}; 
export default FormInput;