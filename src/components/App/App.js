import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import '../../vendor/fonts/fonts.css';
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import useSemiPersistentState from '../../hooks/useSemiPersistentState.js';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','');
  const [searchTermOption, setSearchTermOption] = useSemiPersistentState('searchOption',false);
  const [filteredMovies,setFilteredMovies] = useState([])
  const [savedMovies, setSavedMovies] = useSemiPersistentState('savedMovies',[]);
  const [loggedIn, setLoggedIn] = useSemiPersistentState('loggedIn',false);



  const moviesReducer = (state, action) => {
    switch (action.type) {
      case 'MOVIES_FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'MOVIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'MOVIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };

  const [movies, dispatchMovies] = useReducer(
    moviesReducer,
    { data: [], isLoading: false, isError: false }
  );


  useEffect(() => {
    //get user info if logged in
    if (loggedIn) {
      checkCookie();
      api.getMovies().then((res)=>setSavedMovies(res.data)).catch(err => console.log(err))
      console.log(savedMovies)
    }
  }, [loggedIn]);

  // FILTER MOVIES

  function moviesFilter(movieList){
    setFilteredMovies(
      movieList.filter((movie) => {
          if (movie.nameEN) {
            return movie.nameEN.toLowerCase().includes(searchTerm.toLowerCase())
          }
          return false
        })
        .filter((movie) => {
          if (movie.duration >= 40 && searchTermOption){
            return false
          }
          return movie
        })
    )
  }
  useEffect(() => {
    moviesFilter(movies.data)
  }, [movies.data])


  // LOGIN
  function handleLogin(e) {
    e.preventDefault();
    checkCookie();
  }

  // GET USER INFO
  function checkCookie() {
    api.getUserInfo().then((res) => {
      setLoggedIn(true)
      setCurrentUser(res.data)
      return res
    })
    .catch(err => {
      setLoggedIn(false) 
    });
  }

  // UPDATE USER
  function handleUpdateUser(user) {
    api.updateProfile(user.name, user.email).then((res) => {
      setCurrentUser(res.data)
    })
    .catch(err => console.log(err))
  }

  // SEARCH
  function handleSearch(text, option) {
    dispatchMovies({ type: 'MOVIES_FETCH_INIT'})
    moviesApi.getMovies()
      .then((result) => {
        setSearchTerm(text);
        setSearchTermOption(option);
        dispatchMovies({
          type: 'MOVIES_FETCH_SUCCESS',
          payload: result,
        });
      })
      .catch(() =>
        dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' })
      );
  }

  function handleSaveCard(card) {
    if (savedMovies.some(movie => movie.movieId === card.id ) || card.movieId) {
      //DELETE saved card
      handleDeleteCard(card)
    } else {
      console.log(card)
      const savedCard = {
        country: card.country || 'Imaginarium',
        director: card.director || '',
        duration: card.duration || 0,
        year: card.year || '',
        description: card.description || '',
        image: `https://api.nomoreparties.co/${card.image.url}` || '',
        trailerLink: card.trailerLink || '',
        thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}` || '',
        nameEN: card.nameEN || '',
        nameRU: card.nameRU || '',
        movieId: card.id || 0
      }
      api.saveCard(savedCard).then((newCard) => {
        //dispatchMovies({type: 'SAVE_MOVIE'})
        //TODO SAVE LOCAL STORAGE
        console.log('saved')
        setSavedMovies(savedMovies.concat(newCard.data))
      })
      .catch(err => console.log(err))
    }
  }

  function handleDeleteCard(card) {

    let cardId;
    //Movies page
    if (card.id) {
      cardId = savedMovies.find(mov => mov.movieId === card.id)._id

    } else {
      //Saved movies
      cardId = card._id
    }

     api.deleteCard(cardId).then(() => {
      setSavedMovies(savedMovies.filter(mov => mov._id !== cardId.toString()))
    })
    .catch(err => console.log(err))
  }

  function handleSavedSearch(moviesList) {
    moviesFilter(moviesList)
  }
   
  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>  
          <Route exact path='/signin'>
            <Login 
              handleLogin={handleLogin}
              loggedIn={loggedIn}
            />
          </Route>
          <Route exact path='/signup'>
            <Register 
              handleLogin={handleLogin}
            />
          </Route> 
          <ProtectedRoute 
            path='/movies'
            loggedIn={loggedIn}
            movies={movies}
            list={filteredMovies}
            onSearchSubmit={handleSearch}
            onSaveCard={handleSaveCard}
            component={Movies}
          />
          <ProtectedRoute 
            path='/saved-movies'
            loggedIn={loggedIn}
            movies={savedMovies}
            savedMovies={savedMovies}
            onSearchSubmit={handleSavedSearch}
            onDeleteCard={handleDeleteCard}
            onLoad={dispatchMovies}
            component={SavedMovies}
          />
          <ProtectedRoute 
            path='/profile'
            loggedIn={loggedIn}
            component={Profile}
            onUpdateUser={handleUpdateUser}
          />
          <Route path='*'>
            <PageNotFound />
          </Route> 
        </Switch> 
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
