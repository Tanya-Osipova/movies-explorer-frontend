import React from 'react';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import './Profile.css';

function Profile() {
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
              <p className="profile__value">username</p>
            </div>
            <div className="profile__user">
              <p className="profile__key">Email</p>
              <p className="profile__value">email</p>
            </div>
          </div>
          <button className="profile__button" type="button">
            Update Profile
          </button>
          <button className="profile__button" type="button">
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
