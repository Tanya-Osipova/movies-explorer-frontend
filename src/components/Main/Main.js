import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Header from '../Header/Header';
import Portfolio from '../Portfolio/Portfolio';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
      <Header />
      <main>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;