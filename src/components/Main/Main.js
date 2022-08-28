import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';

function Main(props) {
  return (
    <>
      <Header 
        {...props}
      />
      
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      
      <Footer />
    </>
  );
}

export default Main;