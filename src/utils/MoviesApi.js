export default class MoviesApi {
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
  }

  // Get Movies
  getMovies() {
    const promise = fetch(`${this._url}`, {
      headers: this._headers
    })
      
    return this._makeRequest(promise);
  } 
}

// Api
export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
}); 