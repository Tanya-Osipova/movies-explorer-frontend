import React from 'react';
import Title from '../Title/Title';
import './Techs.css'

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__content">
         <Title title="Technologies" />
        <h3 className="techs__title">
          7 Technologies
        </h3>
        <p className="techs__text">
          On the web development course, we mastered the technologies that
          we used in this project.
        </p>
        <ul className="techs__list">
          <li className="techs__item">
            HTML
          </li>
          <li className="techs__item">
            CSS
          </li>
          <li className="techs__item">
            JS
          </li>
          <li className="techs__item">
            React
          </li>
          <li className="techs__item">
            Git
          </li>
          <li className="techs__item">
            Express.js
          </li>
          <li className="techs__item">
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
