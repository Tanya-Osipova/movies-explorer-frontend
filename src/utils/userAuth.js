//export const BASE_URL = 'https://exploremovies.nomoredomains.xyz/api';
export const BASE_URL = 'http://localhost:3001/api';

export const register = (username, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': username,
      'email': email, 
      'password': password
    })
  })
  .then((res) => {
    try {
      if (res.status === 201){
        return res.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};

// LOGIN
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email, 
      'password': password
    })
  })
  .then((res) => {
    try {
      if (res.status === 200){

        return res.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
}; 

// CHECK TOKEN
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())  
}