import React from 'react';
import Title from '../Title/Title';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <Title title="About Project" />
      <div className="about-project__content">
        <div className="about-project__description">
          <p className="about-project__description-title">
            The project included 5 stages
          </p>
          <p className="about-project__text">
            Drawing up a plan, working on the backend, layout, adding 
            functionality and final improvements.
          </p>
        </div>
        <div className="about-project__description">
          <p className="about-project__description-title">
            It took 5 weeks to complete the project
          </p>
          <p className="about-project__text">
            Each stage had a soft and hard deadline that had to be met 
            in order to successfully defend.
          </p>
        </div>
      </div>
      <div className="about-project__progressbar-container">
        <div className="about-project__progressbar">
          <p className="about-project__date">1 week</p>
          <p className="about-project__progressbar-title">Back-end</p>
        </div>
        <div className="about-project__progressbar about-project__progressbar_front">
          <p className="about-project__date about-project__date_front">4 weeks</p>
          <p className="about-project__progressbar-title">Front-end</p>
        </div> 
      </div>
    </section>
  );
}

export default AboutProject;
