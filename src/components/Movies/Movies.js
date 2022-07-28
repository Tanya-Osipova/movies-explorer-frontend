import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import './Movies.css';


function Movies() {
  return (
    <section className="movies">
      <NavigationAuth />
      <SearchForm />
      <MoviesCardList />
      <MoreButton>More</MoreButton>
      <Footer />
    </section>
  );
}

export default Movies;