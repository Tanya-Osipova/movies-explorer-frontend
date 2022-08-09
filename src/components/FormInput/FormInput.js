import React, {useState} from 'react';
import './FormInput.css';

const FormInput = ({ type, id, name, children, value, onChange }) => {
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
        />
      </label>
      {/* <p className={`${isValid ? `form__error-message_hide` : `form__error-message`}`}>
        
      </p> */}
    </>
  )
};

export default FormInput;