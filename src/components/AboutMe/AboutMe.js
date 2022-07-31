import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';
import studentPic from '../../images/profile/tanya.jpg'
import './AboutMe.css'

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <Title title="About Me" />
      <div className="about-me__content">
        <div className="about-me__text-container">
          <h3 className="about-me__title">
            Tanya
          </h3>
          <p className='about-me__subtitle'>
            Frontend developer
          </p>
          <p className="about-me__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing 
            elit. Iusto ipsa tenetur quas ratione reprehenderit 
            cupiditate iste labore quo, asperiores eos aperiam 
            quos beatae? Laboriosam, sunt. Eum tenetur voluptate 
            ex perspiciatis.
          </p>
          <ul className="about-me__list">
            <li className="about-me__item">
              <Link 
                className="about-me__link" 
                to={{ pathname: "https://github.com/Tanya-Osipova" }}
                target='_blank'
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
        <img className="about-me__image" src={studentPic} alt="student" />
      </div>
    </section>
  );
}

export default AboutMe;
