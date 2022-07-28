import React from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css'

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Educational project of a student of the Faculty of Web Development.
      </h1>
      <NavTab />
    </section>
  );
}

export default Promo;
