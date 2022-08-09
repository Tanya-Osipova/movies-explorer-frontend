import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreButton from '../MoreButton/MoreButton';
import Footer from '../Footer/Footer';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearchInput = (event) => {
  //   setSearchTerm = event.target.value;
  // };

  // const searchedMovies = movies.filter(function (movie) {
  //   return movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  // });

  // const handleSearchSubmit = (event) => {
  
  //   event.preventDefault();
  // };


  return (
    <>
      <NavigationAuth />
      <SearchForm 
        //searchTerm={searchTerm}
        //onSearchInput={handleSearchInput}
        // onSearchSubmit={handleSearchSubmit}
      />

      {props.isError && <p>Something went wrong ...</p>}

      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList cards={props.cards} />
      )}

      <MoreButton>More</MoreButton>
      <Footer />
    </>
  );
}

export default Movies;