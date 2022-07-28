import React from 'react';
import successIcon from '../../images/icons/success.svg';
//import failedIcon from '../../images/icons/failed.svg';
import './PopupMessage.css';

const PopupMessage = () => {
  return (
    <div className='popup-message'>
      <img className='popup-message__image' src={successIcon} alt="icon" />
      <p className='popup-message__text'>You are successfully registered!</p>
    </div>
  );
}

export default PopupMessage;