import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
      <div className={active ? 'popup__content active' : 'popup__content'} onClick={e => e.stopPropagation()}>
        <button className='popup__close-button' onClick={() => setActive(!active)}></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
/*
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [popupActive]);

  function handleEscapeKey(e) {
    if(e.key === 'Escape') {
      setPopupActive(false)
    }   
  }
  */

   {/*       
      <Popup 
        active={popupActive} 
        setActive={setPopupActive} 
        message='You are successfully registered!'
        icon={successIcon}
      />
      <button onClick={() => setPopupActive(true)}>click</button>  
      */}