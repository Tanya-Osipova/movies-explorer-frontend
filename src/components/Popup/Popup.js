import React from 'react';
import './Popup.css';

const Popup = ({ active, setActive, message, icon }) => {
  return (
    <div className={active ? 'popup active' : 'popup'} onClick={() => setActive(false)}>
      <div className={active ? 'popup__content active' : 'popup__content'} onClick={e => e.stopPropagation()}>
        <button className='popup__close-button' onClick={() => setActive(!active)}></button>
        <div className='popup__message-container'>
          <img className='popup__image' src={icon} alt="icon" />
          <p className='popup__message'>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Popup;