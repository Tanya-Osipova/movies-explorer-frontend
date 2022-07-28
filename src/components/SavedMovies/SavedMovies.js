import React from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <div>
      <NavigationAuth />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default SavedMovies;
