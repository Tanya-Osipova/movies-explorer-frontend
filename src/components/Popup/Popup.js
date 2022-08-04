import React from 'react';
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
