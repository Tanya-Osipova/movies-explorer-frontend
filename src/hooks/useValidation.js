import React, {useEffect} from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = React.useState(true)
  const [minLengthError, setMinLengthError] = React.useState(false)
  const [maxLengthError, setMaxLengthError] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [inputValid, setInputValid] = React.useState(false)

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true)
          break;
        case 'minLength':
          value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)
          break;
        case 'maxLength':
          value.length > validations[validation] ? setMaxLengthError(true) : setMaxLengthError(false)
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
          break;
        default:
          value ? setIsEmpty(false) : setIsEmpty(true)
      }
    }
  }, [value])

  useEffect(() => {
    if(isEmpty || minLengthError || maxLengthError || emailError) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, minLengthError, maxLengthError, emailError])

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid
  }
}

export default useValidation;