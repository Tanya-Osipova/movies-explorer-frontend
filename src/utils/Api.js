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
      throw 'Ошибка запроса'
    }).then((obj) => {
      return obj;
    })
  }
  
  // Get User Info
  getUserInfo() {
    const promise = fetch(`${this._url}/users/me`, {
      headers: this._headers
    })

    return this._makeRequest(promise);
  }


  // Update Profile
  updateProfile(name) {
    const promise = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
      })
    });
  
    return this._makeRequest(promise);
  }
}

// Api
export const api = new Api({
  url: '',
  headers: {
    authorization: '',
    'Content-Type': 'application/json'
  }
}); 