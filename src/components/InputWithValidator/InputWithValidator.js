import React, { useState } from 'react';
import './InputWithValidator.css';

const InputWithValidator = ({
  id,
  name,
  props,
  checks,
  errorMessage,
  placeholder,
  className,
  onChange,
}) => {
  const [isValid, setIsValid] = useState(true);

  const checkValidity = e => {
    const { validity } = e.target;
    const validInputs = checks.filter(check => validity[check]).length === 0;
    setIsValid(validInputs);
  };

  return (
    <>
      <input 
        id={id} 
        name={name}
        placeholder={placeholder}
        {...props} 
        onBlur={checkValidity} 
        className={className} 
        onChange={onChange}
      />
      <span className={`${isValid ? `input__error-message` : `input__error-message input__error-message_show `}`}>
        {errorMessage}
      </span>
    </>
  );
}

export default InputWithValidator;