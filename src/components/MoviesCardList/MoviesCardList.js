import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';
import './MoviesCardList.css'

const MoviesCardList = ({ list, onClick, ...props }) => {
  const screenWidth = window.innerWidth;
  const [more, setMore] = useState(0);
  const desktopResolution = 1280;
  const tabletResolution = 600;
  const initialDesktopCards = 12;
  const initialTabletCards = 8;
  const initialMobileCards = 5;
  const moreCardsDesktop = 3;
  const moreCardsTabletMobile = 2;
  
  useEffect(() => {
    if (screenWidth >= desktopResolution) {
      setMore(initialDesktopCards);
    } 
    if (screenWidth < desktopResolution && screenWidth >= tabletResolution) {
      setMore(initialTabletCards);
    } 
    if (screenWidth < tabletResolution) {
      setMore(initialMobileCards);
    }
  },[])

  const handleMore = () => {
    if (screenWidth >= desktopResolution) {
      setMore((prevValue) => prevValue + moreCardsDesktop);
    } else {
      setMore((prevValue) => prevValue + moreCardsTabletMobile);
    }
  };

  if (!list.length && props.searchText && (props.allMovies.length > 0)) {
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
            key={card.id || card.movieId} 
            card={card}
            icon={props.icon}
            onClick={onClick}
            searchOptions={props.searchOptions} 
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
