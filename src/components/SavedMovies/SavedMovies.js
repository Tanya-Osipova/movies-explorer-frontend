import React from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <>
      <NavigationAuth />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default SavedMovies;
