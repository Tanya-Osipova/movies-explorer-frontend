import React from 'react';

const useSemiPersistentState = (key, initialState) => {
  const jsonValue = JSON.parse(localStorage.getItem(key))
  const [value, setValue] = React.useState(
    jsonValue || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key]);
  return [value, setValue];
};

export default useSemiPersistentState;