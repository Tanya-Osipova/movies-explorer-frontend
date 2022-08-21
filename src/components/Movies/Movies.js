import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  useEffect(() => {
    props.moviesFilter(props.movies.data)
  },[])

    // FILTER MOVIES
  useEffect(() => {
    props.moviesFilter(props.movies.data)
  },[props.searchOptions])

  return (
    <>
      <NavigationAuth />
      <SearchForm 
        onSearchSubmit={props.onSearchSubmit}
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
          list={props.list} 
          onClick={props.onSaveCard} 
          icon={` movies-card__save-button_active`}
          searchText={props.searchText}
        />
      )}
      <Footer />
    </>
  );
}

export default Movies;