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
      if (res.status === 200){
        return res.json();
      }
    } catch(e){
      return (false)
    }
  })
  .catch((err) => console.log(err));
};