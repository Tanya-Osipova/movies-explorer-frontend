import React from 'react';
import useValidation from './useValidation';

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isError, setIsError] = React.useState(false);
  const valid = useValidation(value, validations)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const onBlur = (e) => {
    setIsError(true)
  }

  const updateValue = (v) => {
    setValue(v)
  }

  return {
    value,
    onChange,
    onBlur,
    updateValue,
    isError,
    ...valid
  }
}

export default useInput;