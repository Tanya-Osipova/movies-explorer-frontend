import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';
import Popup from '../Popup/Popup';
import ProfileUpdate from '../ProfileUpdate/ProfileUpdate';
import './Profile.css';
import useSemiPersistentState from '../../hooks/useSemiPersistentState';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [popupActive, setPopupActive] = useState(false);
  const history = useHistory();
  const [savedMovies, setSavedMovies] = useSemiPersistentState('savedMovies',[])
  const [loggedIn,setLoggedIn] = useSemiPersistentState('loggedIn', false)
  
  // POPUP
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
  }, [popupActive]);

  //Redirect to home page if logged out
  useEffect(() => {
    if (!loggedIn) history.push('/')
  },[loggedIn])

  function handleEscapeKey(e) {
    if(e.key === 'Escape') {
      setPopupActive(false)
    }   
  }

  // SIGNOUT
  function signOut() {
    api.signOut().then(() => {
      setLoggedIn(false)
    })
    .catch(err => console.log(err))
    setSavedMovies([])
  }
  
  return (
    <>
      <NavigationAuth />
      <div className="profile">
        <div className="profile__container">
          <h3 className="profile__title">
            Hi, {currentUser.name}!
          </h3>
          <div className="profile__info">
            <div className="profile__user">
              <p className="profile__key">Name</p>
              <p className="profile__value">{currentUser.name}</p>
            </div>
            <div className="profile__user">
              <p className="profile__key">Email</p>
              <p className="profile__value">{currentUser.email}</p>
            </div>
          </div>
          <button 
            className="profile__button" 
            type="button"
            onClick={() => setPopupActive(true)}
          >
            Update Profile
          </button>
          <button 
            className="profile__button" 
            type="button"
            onClick={signOut}
            >
            Sign out
          </button>
        </div>
      </div>
      {/* UPDATE */}
      <Popup
        active={popupActive} 
        setActive={setPopupActive}
      >
        <ProfileUpdate 
          onUpdateUser={props.onUpdateUser}
          active={popupActive}
          setActive={setPopupActive}
          user={currentUser}
        />
      </Popup>
    </>
  );
}

export default Profile;
