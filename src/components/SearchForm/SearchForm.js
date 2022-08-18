import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useSemiPersistentState from '../../hooks/useSemiPersistentState.js';

import './SearchForm.css';

function SearchForm({ onSearchSubmit,...props }) {
  //const name = useInput('', {isEmpty: true})
  const [checked, setChecked] = useSemiPersistentState('searchOption',false);
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','');

  const handleFilterChange = () => {
    setChecked(!checked);
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(checked)
    onSearchSubmit(searchTerm, checked)
  }

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        className="search-form__input"
        type= "text"
        id="search"
        name="search"
        placeholder="Search.."
        value={searchTerm}
        onChange={handleSearchInput}
      />
      <button 
        className="search-form__button" 
        type="submit" 
        disabled={!searchTerm}
      >
      </button>
      <FilterCheckbox 
        label="Short film"
        value={checked}
        onChange={handleFilterChange}
      />
    </form>
  );
}

export default SearchForm;