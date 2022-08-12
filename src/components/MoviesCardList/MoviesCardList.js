import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreButton from '../MoreButton/MoreButton';
import './MoviesCardList.css'

const MoviesCardList = ({ list }) => {
  const [next, setNext] = React.useState(3);
  
  const handleMore = () => {
    setNext((prevValue) => prevValue + 3);
  };

  if (!list.length) {
    return (
      <p className="movies-card-list__not-found">
        No movies were found
      </p>
    )
  }

  return (
    <>
      <ul className="movies-card-list">
        {list.slice(0, next).map((card) => (
          <MoviesCard 
            key={card.id} 
            card={card} 
          />
        ))}
      </ul>

      {next < list.length && (
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
