import React from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';
import { useState } from 'react';


function SavedMovies(props) {

  // useEffect(() => {
  //   console.log(props)
  //   props.setFilteredMovies(props.savedMovies)//update saved cards on page load
  //  },[])

  // FILTER MOVIES
  useEffect(() => {
    console.log(props)
    props.moviesFilter(props.savedMovies)
  },[props.searchOptions, props.savedMovies])
  
  function handleSubmit(text,option) {
    props.onSearchSubmit(text,option)
  }
  
  return (
    <>
      <NavigationAuth />
      <SearchForm 
        onSearchSubmit={handleSubmit}
        {...props}
      />

      {props.movies.isError && 
        <p className='message-info'>
          Error while loading data. Try again later!
        </p>
      }

      {props.movies.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList 
          list={props.movies} 
          onClick={props.onDeleteCard} 
          icon={` movies-card__save-button_delete`}
          {...props}
        />
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
