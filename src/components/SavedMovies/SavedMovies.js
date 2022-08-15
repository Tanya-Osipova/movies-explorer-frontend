import React from 'react';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import useSemiPersistentState from '../../hooks/useSemiPersistentState';


function SavedMovies(props) {
  const [listSavedMovies, setListSavedMovies] = useSemiPersistentState('savedMovies',[]);

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
          list={listSavedMovies} 
          onClick={props.onDeleteCard} 
          icon={` movies-card__save-button_delete`}
        />
      )}
      <Footer />
    </>
  );
}

export default SavedMovies;
