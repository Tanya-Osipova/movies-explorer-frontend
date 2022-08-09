import React from 'react';
import { useHistory } from 'react-router-dom';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/MainApi';


function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const history = useHistory();

  function signOut() {
    api.signout().then(() => {
      localStorage.setItem('loggedIn', false)
      history.push('/signin')
    })
    .catch(err => console.log(err))
  }
  
  return (
    <>
      <NavigationAuth />
      <div className="profile">
        <div className="profile__container">
          <h3 className="profile__title">
            Hi, Username!
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
          <button className="profile__button" type="button">
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
    </>
  );
}

export default Profile;
