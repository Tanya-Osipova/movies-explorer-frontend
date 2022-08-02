import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Popup from '../Popup/Popup';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
//import successIcon from '../../images/icons/success.svg';
//import failedIcon from '../../images/icons/failed.svg';
import '../../vendor/fonts/fonts.css';
import ProtectedRoute from "../ProtectedRoute";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
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
  render() {
  return (
    <div className='app'>
      <Popup />
      <Switch>
         
        <ProtectedRoute 
          path='/movies'
          loggedIn={this.state.loggedIn}
          component={Movies}
        />
        <ProtectedRoute 
          path='/saved-movies'
          loggedIn={this.state.loggedIn}
          component={SavedMovies}
        />
        <ProtectedRoute 
          path='/profile'
          loggedIn={this.state.loggedIn}
          component={Profile}
        />
        <Route exact path='/'>
          <Main />
        </Route>  
        <Route path='/signin'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Register />
        </Route> 
        {/* <Route path='*'>
          <PageNotFound />
        </Route> */}
        <Route>
          {this.state.loggedIn ? (
            <Redirect to="/movies" />
          ) : (
            <Redirect to="/signin" />
          )}
        </Route> 

        
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
}

export default App;
