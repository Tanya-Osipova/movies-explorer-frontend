import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useSemiPersistentState from '../../hooks/useSemiPersistentState.js';
import useInput from '../../hooks/useInput';

import './SearchForm.css';

function SearchForm({ onSearchSubmit,...props }) {
  const name = useInput('', {isEmpty: true})
  const [checked, setChecked] = useSemiPersistentState('searchOption',false);
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search','');

  const handleFilterChange = () => {
    setChecked(!checked);
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
    name.onChange(event)
  };
  
  const handleSearchSubmit = (e) => {
    name.onBlur(e)
    console.log(name)
    e.preventDefault();
    if (name.inputValid) {
      onSearchSubmit(searchTerm, checked)
    } 
    name.isError = true
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
      {(name.isError && name.isEmpty) && <p className='form__error-message'>Search keyword is required!</p>}

      <button 
        className="search-form__button" 
        type="submit" 
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