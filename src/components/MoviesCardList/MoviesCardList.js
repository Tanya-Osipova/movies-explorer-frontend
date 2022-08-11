import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'

const MoviesCardList = ({ list }) => (
  <ul className="movies-card-list">
    {list.map((card) => (
        <MoviesCard 
          key={card.id} 
          card={card} 
        />
    ))}
  </ul>
);

export default MoviesCardList;
