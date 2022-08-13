import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import './MoviesCardList.css'

const MoviesCardList = ({ list }) => {
  const screenWidth = window.innerWidth;
  const [more, setMore] = React.useState(3);
  
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
        No movies were found
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
        <MoreButton
          type="button"
          onClick={handleMore}
        >
          More
        </MoreButton> 
      )}
    </>
  )
};

export default MoviesCardList;
