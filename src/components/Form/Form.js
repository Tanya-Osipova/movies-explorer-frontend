import React from 'react';
import './Form.css';

const Form = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    {children}
  </form>
);

export default Form;
