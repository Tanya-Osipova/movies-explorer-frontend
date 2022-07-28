import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import '../../vendor/fonts/fonts.css';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import Popup from '../Popup/Popup';

function App() {
  /*
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  function handleEscapeKey(e) {
    if(e.key === 'Escape') {
      setPopupActive(false)
    }   
  }
  */
  return (
    <div className='app'>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>  
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route> 
        {/* <Route exact path='/movies'>
          <Movies />
        </Route>
         <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
