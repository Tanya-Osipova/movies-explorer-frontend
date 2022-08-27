import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  const handleSearchOption = (option) => {
        props.setFoundMovies({
          ...props.list,
          searchTermOption: option
        })
  }

  const handleSearch = (text) => {
        props.setFoundMovies({
          ...props.list,
          searchTerm: text
        })
  }

  return (
    <>
      <NavigationAuth />
      <SearchForm 
        onSearchSubmit={props.onSearchSubmit}
        searchText={props.list.searchTerm}
        searchOptions={props.list.searchTermOption}
        setSearchOption={handleSearchOption}
        setSearchText={handleSearch}
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
          list={props.list.data} 
          onClick={props.onSaveCard} 
          icon={` movies-card__save-button_active`}
          searchText={props.list.searchTerm}
          searchOptions={props.searchOptions}

        />
      )}
      <Footer />
    </>
  );
}

export default Movies;