import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as userAuth from '../../utils/userAuth.js';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import '../../vendor/fonts/fonts.css';
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import SearchForm from '../SearchForm/SearchForm.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const history = useHistory();

  
  useEffect(() => {
  // Check cookie on reload
  if (localStorage.getItem('loggedIn')){
    setLoggedIn(localStorage.getItem('loggedIn'))//set status to saved in local storage
  }
  checkCookie()
  },[])

  useEffect(() => {
    setIsLoading(true);

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
    moviesApi.getMovies()
      .then((movie) => {
        console.log(movie)
        setMovies(movie)
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
    //.catch(err => {
    //   console.log(err); 
    // });
    
  }, [loggedIn])


  // LOGIN
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

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
   
  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute 
            path='/movies'
            loggedIn={loggedIn}
            isLoading={isLoading}
            isError={isError}
            cards={movies}
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
        {/* <ScrollToTopButton /> */}
      </CurrentUserContext.Provider>
    </div>
  );
  
}

export default App;
