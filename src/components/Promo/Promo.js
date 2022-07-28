import React, { useState, useEffect } from 'react';
import NavTab from '../NavTab/NavTab';
import './Promo.css'

function Promo() {
  const [activePromo, setActivePromo] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 100) {
        setActivePromo(true);
      } else {
        setActivePromo(false);
      }
    });
  }, []);

  return (
    <section className={activePromo ? "promo promo_active" : "promo"}>
      <h1 className="promo__title">
        Educational project of a student of the Faculty of Web Development
      </h1>
      <NavTab />
    </section>
  );
}

export default Promo;
