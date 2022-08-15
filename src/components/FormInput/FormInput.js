import React, {useState} from 'react';
import './FormInput.css';

const FormInput = ({ id, name, children, value, onChange, validators, errorMessage, props }) => {
  const [isValid, setIsValid] = useState(true);

  const checkValidity = e => {
    const { validity } = e.target;
    const validInputs = validators.filter(validator => validity[validator]).length === 0;
    setIsValid(validInputs);
  };
  
  return (
    <>
      <label className='form__label'>
        {children}
        <input
          className='form__input'
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...props} 
          onChangeCapture={checkValidity} 
        />
      </label>
      <p className={`${isValid ? `form__error-message_hide` : `form__error-message`}`}>
        {errorMessage}
      </p>
    </>
  )
};

export default FormInput;