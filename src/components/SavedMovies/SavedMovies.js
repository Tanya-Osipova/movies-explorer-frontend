import React from 'react';
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
// on component mount
useEffect(()=> {
  props.setSearchText('')
},[])

  // FILTER MOVIES or return saved movies on load
  useEffect(() => {
    props.setFilteredMovies(props.moviesFilter(props.savedMovies, props.searchText))

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
          searchOptions={props.searchOptions}
          allMovies={props.savedMovies}
          />
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
