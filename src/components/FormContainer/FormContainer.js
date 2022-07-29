import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import './FormContainer.css';

function FormContainer(props) {
  return (
    <div className='form-container'>
      <h3 className='form-container__title'>{props.title}</h3>
      <Form {...props} />
      <div className="form-container__link-container">
        <p className="form-container__question">
          {props.question}
        </p>
        <Link className="form-container__link" to={props.link}>
          {props.linkName}
        </Link>
      </div>
    </div>
  );
}

export default FormContainer;
