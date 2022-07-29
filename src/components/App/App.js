import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Popup from '../Popup/Popup';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import successIcon from '../../images/icons/success.svg';
//import failedIcon from '../../images/icons/failed.svg';
import '../../vendor/fonts/fonts.css';


function App() {
  /*
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [popupActive]);

  function handleEscapeKey(e) {
    if(e.key === 'Escape') {
      setPopupActive(false)
    }   
  }
  */
  return (
    <div className='app'>
      <Popup />
      <Switch>
        {/* <Route exact path='/'>
          <Main />
        </Route>  
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route>  */}

        <Route exact path='/'>
          <Movies />
        </Route>
         <Route path='/saved-movies'>
          <SavedMovies />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>

        {/* <Route path='*'>
          <PageNotFound />
        </Route>   */}
      </Switch> 
      {/* <ScrollToTopButton /> */}
      {/*       
      <Popup 
        active={popupActive} 
        setActive={setPopupActive} 
        message='You are successfully registered!'
        icon={successIcon}
      />
      <button onClick={() => setPopupActive(true)}>click</button>  
      */}
    </div>
  );
}

export default App;
