import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
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

      {props.movies.isError && <p style={{textAlign: 'center', fontWeight: 'bold'}}>Something went wrong ...</p>}

      {props.movies.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList list={props.list} />
      )}
      <Footer />
    </>
  );
}

export default Movies;