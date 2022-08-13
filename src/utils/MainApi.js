export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // Promise
  _makeRequest(promise) {
    return promise.then((res) => {
      if(res.ok) {
        return res.json();
      }
      throw 'error'
    }).then((obj) => {
      return obj;
    })
    .catch((err) => console.log(err))
  }
  
  // Get User Info
  getUserInfo() {
    const promise = fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
    return this._makeRequest(promise);
  }

  // Update Profile
  updateProfile(name, email) {
    const promise = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      })
    });
    return this._makeRequest(promise);
  }

  //SignOut
  signOut() {
    const promise = fetch(`${this._url}/signout`, {
      headers: this._headers,
      credentials: 'include',

    })
    return this._makeRequest(promise);
  }
}

// Api
export const api = new Api({
  url: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  },
}); 