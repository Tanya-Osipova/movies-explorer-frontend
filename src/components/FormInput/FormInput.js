import React, {useState} from 'react';
import './FormInput.css';

const FormInput = ({ type, id, name, children, value, onChange, errorTypes, errorMessage }) => {
  const [isValid, setIsValid] = useState(true);

  const checkValidity = e => {
    const { validity } = e.target;
    const valid = errorTypes.filter(errorType => validity[errorType]).length === 0;
    setIsValid(valid);
  };
  
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