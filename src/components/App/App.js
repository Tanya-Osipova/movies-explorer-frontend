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
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','');
  const [searchTermOption, setSearchTermOption] = useSemiPersistentState('searchOption',false);
  const [savedMovies, setSavedMovies] = useSemiPersistentState('savedMovies',[]);


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
    // Check cookie on reload
    if (localStorage.getItem('loggedIn')){
      setLoggedIn(localStorage.getItem('loggedIn'))//set status to saved in local storage
    }
    api.getMovies().then((movies) => setSavedMovies(movies.data))
    checkCookie()
  },[])

  useEffect(() => {
    if (!loggedIn) return;
    // User info
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data)
      })
      .catch(err => {
        console.log(err);
        history.push('/signin') 
      });
  }, [loggedIn]);

  // FILTER MOVIES
  const searchedMovies = movies.data.filter((movie) => {
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
  });

  // LOGIN
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  // GET USER INFO
  function checkCookie() {
    api.getUserInfo().then((res) => {
      setLoggedIn(true)
      setCurrentUser(res)
      localStorage.setItem('loggedIn', true)
    })
    .catch(err => {
      console.log(err); 
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
        console.log(searchedMovies);
      })
      .catch(() =>
        dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' })
      );
  }

  function handleSaveCard(card) {
    const savedCard = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co/${card.image.url}`,
      trailerLink: card.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
      nameEN: card.nameEN,
      nameRU: card.nameRU,
      movieId: card.id
    }
    
    api.saveCard(savedCard).then((newCard) => {
      //dispatchMovies({type: 'SAVE_MOVIE'})
      //TODO SAVE LOCAL STORAGE
      setSavedMovies(savedMovies.concat(newCard.data))
    })
    .catch(err => console.log(err))
  }

  function handleDeleteCard(card) {
     api.deleteCard(card._id).then((newCard) => {
      console.log(newCard._id)
      setSavedMovies(savedMovies.filter(mov => mov._id !== newCard._id))
    })
    .catch(err => console.log(err))
  }
   
  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute 
            path='/movies'
            loggedIn={loggedIn}
            movies={movies}
            list={searchedMovies}
            onSearchSubmit={handleSearch}
            onSaveCard={handleSaveCard}
            component={Movies}
          />
          <ProtectedRoute 
            path='/saved-movies'
            loggedIn={loggedIn}
            movies={movies}
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
          <Route exact path='/'>
            <Main />
          </Route>  
          <Route path='/signin'>
            <Login 
              handleLogin={handleLogin} 
            />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route> 
          <Route path='*'>
            <PageNotFound />
          </Route> 
        </Switch> 
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
