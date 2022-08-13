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
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search');
  const [searchTermOption, setSearchTermOption] = useSemiPersistentState('searchOption');

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
    dispatchMovies({ type: 'MOVIES_FETCH_INIT' });

    moviesApi.getMovies()
      .then((result) => {
        dispatchMovies({
          type: 'MOVIES_FETCH_SUCCESS',
          payload: result,
        });
      })
      .catch(() =>
        dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' })
      );
  }, []);


  useEffect(() => {
  // Check cookie on reload
  if (localStorage.getItem('loggedIn')){
    setLoggedIn(localStorage.getItem('loggedIn'))//set status to saved in local storage
  }
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
    
    // Movies
  
    // moviesApi.getMovies()
    //   .then((movie) => {
    //     console.log(movie)
    //     setMovies(movie)
    //     setIsLoading(false);
    //   })
    //   .catch(() => setIsError(true))
    //   .catch(err => {
    //     console.log(err); 
    //   });
  }, [loggedIn]);

  // FILTER MOVIES
  const searchedMovies = movies.data.filter((movie) => {
    console.log(movie)
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
    moviesApi.getMovies()
      .then((result) => {
        console.log(result)
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
            component={Movies}
          />
          <ProtectedRoute 
            path='/saved-movies'
            loggedIn={loggedIn}
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
