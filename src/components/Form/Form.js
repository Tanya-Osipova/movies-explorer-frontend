import React from 'react';

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit} noValidate>
    {children}
  </form>
);

export default Form;
