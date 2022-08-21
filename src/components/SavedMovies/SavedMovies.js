import React from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { useEffect } from 'react';
import { useState } from 'react';


function SavedMovies(props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
     setMovies(props.savedMovies)//update saved cards on page load
   },[])

   useEffect(() => {

   }, [props.searchText])
  
  function handleSubmit(text,option) {
    setMovies(props.movies)
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
          list={movies || []} 
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
