import React, { useState, useEffect } from 'react';
import successIcon from '../../images/icons/success.svg';
import errorIcon from '../../images/icons/error.svg';
import Popup from '../Popup/Popup';

const PopupMessage = (props) => {
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    setPopupActive(props.isOpen)
  })

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

  return (
    <>
    <Popup
      active={popupActive} 
      setActive={setPopupActive}
    >
      <div className='popup__message-container'>
        <img 
          className='popup__image' 
          src={props.message === 'Success' ? successIcon : errorIcon} 
          alt="icon" 
        />
        <p className='popup__message'>
          {props.message === 'Success' ? 'You are successfully registered!' : 'Something went wrong! Try again.'}
        </p>
      </div>  
    </Popup> 
    {/* <button onClick={() => setPopupActive(true)}>click</button>   */}
    </>
  );
}

export default PopupMessage;
