import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import './MoviesCardList.css'

const MoviesCardList = ({ list }) => {
  const screenWidth = window.innerWidth;
  const [more, setMore] = useState(3);
  
  const handleMore = () => {
    if (screenWidth >= 1280) {
      setMore((prevValue) => prevValue + 3);
    } else {
      setMore((prevValue) => prevValue + 2);
    }
  };

  if (!list.length) {
    return (
      <p className="message-info">
        No movies matched your search criteria
      </p>
    )
  }

  return (
    <>
      <ul className="movies-card-list">
        {list.slice(0, more).map((card) => (
          <MoviesCard 
            key={card.id} 
            card={card} 
          />
        ))}
      </ul>

      {more < list.length && (
        <Button
          className="more-button"
          type="button"
          onClick={handleMore}
        >
          More
        </Button> 
      )}
    </>
  )
};

export default MoviesCardList;
