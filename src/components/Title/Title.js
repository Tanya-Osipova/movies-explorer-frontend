import React from 'react';
import './Title.css'

function Title({ title }) {
  return (
    <div>
      <h2 className="title">{title}</h2>
      <hr className="title__line" />
    </div>
  );
}

export default Title;