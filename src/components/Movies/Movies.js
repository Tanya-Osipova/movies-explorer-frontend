import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <>
      <NavigationAuth />
      <SearchForm 
        onSearchSubmit={props.onSearchSubmit}
      />

      {props.movies.isError && <p>Something went wrong ...</p>}

      {props.movies.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList list={props.list} />
      )}

      <MoreButton>More</MoreButton>
      <Footer />
    </>
  );
}

export default Movies;