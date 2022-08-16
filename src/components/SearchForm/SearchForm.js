import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import InputWithValidator from '../InputWithValidator/InputWithValidator';
import useSemiPersistentState from '../../hooks/useSemiPersistentState.js';

import './SearchForm.css';

function SearchForm({ onSearchSubmit }) {
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
    onSearchSubmit(searchTerm, checked)
  }

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <InputWithValidator
        className="search-form__input"
        props={{ type: "text", required: true }}
        id="search"
        name="search"
        placeholder="Search.."
        checks={["valueMissing"]}
        errorMessage="You need to enter a keyword!"
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