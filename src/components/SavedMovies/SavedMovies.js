import React from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';


function SavedMovies(props) {
  // useEffect(() => {
  //   props.onSearchSubmit(props.SavedMovies)//update filtered cards on page load
  // },[])

  
  return (
    <>
      <NavigationAuth />
      <SearchForm 
        onSearchSubmit={props.onSearchSubmit}
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
          list={props.movies || []} 
          onClick={props.onDeleteCard} 
          icon={` movies-card__save-button_delete`}
        />
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
