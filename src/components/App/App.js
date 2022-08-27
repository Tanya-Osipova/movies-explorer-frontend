import React, { useState, useEffect, useReducer } from 'react';
import { Route, Switch,useHistory } from 'react-router-dom';
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
import * as userAuth from '../../utils/userAuth.js';
import { moviesApi } from '../../utils/MoviesApi';
import useSemiPersistentState from '../../hooks/useSemiPersistentState.js';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useSemiPersistentState('user','');
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','');
  const [searchTermOption, setSearchTermOption] = useSemiPersistentState('searchOption',false);
  const [foundMovies, setFoundMovies] = useSemiPersistentState('foundMovies',{data:[], 
                                                                              searchTerm:'',
                                                                              searchTermOption:false});
  const [filteredMovies,setFilteredMovies] = useState([])
  const [savedMovies, setSavedMovies] = useSemiPersistentState('savedMovies',[]);
  const [loggedIn, setLoggedIn] = useSemiPersistentState('loggedIn',false);
  const history = useHistory();


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
      case 'MOVIES_FLUSH':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: [],
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
    if (loggedIn === true) {
      checkCookie();
      api.getMovies().then((res)=>setSavedMovies(res.data)).catch(err => console.log(err))
    } else {
      history.push('/')
    }
  }, [loggedIn]);

  // FILTER
  function moviesFilter(movieList,text){
    setFilteredMovies(
      movieList.filter((movie) => {
          if (movie.nameEN) {
            if (movie.nameEN.toLowerCase().includes(text.toLowerCase())) {
                return true
            }
            
          }
          return false
        })
    )
  }

  //filter movies once search term is updated
  useEffect(() => {
    if (!movies.data || !movies.data.length || !filteredMovies.searchTerm ) return
    console.log(movies,filteredMovies)
    moviesFilter(movies.data, filteredMovies.searchTerm)
    setFoundMovies({data:filteredMovies,
                    searchTerm: searchTerm,
                    searchTermOption:searchTermOption})
  }, [movies.data])


  // LOGIN
  function handleLogin(e,email,password) {
    e.preventDefault();
    userAuth.authorize(email, password)
      .then((data) => {
        if (data) {
          checkCookie()
          return 'Success'
        } else {
          return 'Error'
        }})
        .catch(err => 'Error')
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
    if (movies.data.length === 0){ 
      dispatchMovies({ type: 'MOVIES_FETCH_INIT'})
      moviesApi.getMovies()
        .then((result) => {
          console.log(result)
          dispatchMovies({
            type: 'MOVIES_FETCH_SUCCESS',
            payload: result,
          });
          moviesFilter(result,text)
          setFoundMovies({data:filteredMovies,
                      searchTerm: text,
                      searchTermOption:option})
          console.log(filteredMovies,text)
        })
        .catch(() =>
          dispatchMovies({ type: 'MOVIES_FETCH_FAILURE' })
        );
    } else {
        moviesFilter(movies.data,text)
        setFoundMovies({data:filteredMovies,
                    searchTerm: text,
                    searchTermOption:option})
    }
  }

  function handleSaveCard(card) {
    if (savedMovies.some(movie => movie.movieId === card.id ) || card.movieId) {
      //DELETE saved card
      handleDeleteCard(card)
    } else {
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

  function handleSavedSearch(text,option) {
    setSearchTerm(text)
    setSearchTermOption(option)
    moviesFilter(savedMovies,text)
  }
   
  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path='/'>
            <Main 
              loggedIn={loggedIn}
            />
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
              setCurrentUser={setCurrentUser}
            />
          </Route> 
          <ProtectedRoute 
            path='/movies'
            loggedIn={loggedIn}
            setFoundMovies={setFoundMovies}
            movies={movies}
            list={foundMovies}
            onSearchSubmit={handleSearch}
            onSaveCard={handleSaveCard}
            component={Movies}
          />
          <ProtectedRoute 
            path='/saved-movies'
            loggedIn={loggedIn}
            searchText={searchTerm}
            setSearchText={setSearchTerm}
            searchOptions={searchTermOption}
            setSearchOption={setSearchTermOption}
            movies={filteredMovies}
            savedMovies={savedMovies}
            setFilterMovies={setFilteredMovies}
            moviesFilter={moviesFilter}
            onSearchSubmit={handleSavedSearch}
            onDeleteCard={handleDeleteCard}
            component={SavedMovies}
          />
          <ProtectedRoute 
            path='/profile'
            loggedIn={loggedIn}
            setCurrentUser={setCurrentUser}
            setLoggedIn={setLoggedIn}
            setSavedMovies={setSavedMovies}
            setFoundMovies={setFoundMovies}
            setSearchTerm={setSearchTerm}
            setSearchOption={setSearchTermOption}
            component={Profile}
            onUpdateUser={handleUpdateUser}
            moviesUpdate={dispatchMovies}
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
