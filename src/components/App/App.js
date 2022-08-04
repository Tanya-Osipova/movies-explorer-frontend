import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as userAuth from '../../utils/userAuth.js';
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
import ProtectedRoute from "../ProtectedRoute";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { api } from '../../utils/Api';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserMail, setCurrentUserMail] = useState('');
  const history = useHistory();





  
  //
  useEffect(() => {
    if (!loggedIn) return;

    api.getUserInfo().then((res) => {
      console.log(res)
      setCurrentUser(res)
    })
    .catch(err => {
      console.log(err);
    })
  }, [loggedIn])

  // LOGIN
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  // Check token
  function tokenCheck () {
    return
    // if (localStorage.getItem('token')) {
    //   const token = localStorage.getItem('token');
    //   if(token) {
    //     userAuth.getContent(token).then((res) => {
    //       if(res) {
    //         setCurrentUserMail(res.data.email);
    //         // const userData = {
    //         //   username: res.username,
    //         //   email: res.email
    //         // }
    //         setLoggedIn(true);
    //         history.push('/movies')
    //       }
    //     })
    //   }
    // }
  }
   
  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute 
            path='/movies'
            loggedIn={loggedIn}
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
