import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useInput from '../../hooks/useInput';
import './SearchForm.css';

function SearchForm({ onSearchSubmit, ...props }) {
  const name = useInput(props.searchText, {isEmpty: true})
  
  const handleFilterChange = () => {
    props.setSearchOption(!props.searchOptions);
  };

  const handleSearchInput = (event) => {
    props.setSearchText(event.target.value);
    name.onChange(event)
  };
  
  const handleSearchSubmit = (e) => {
    name.onBlur(e)
    e.preventDefault();
    if (name.inputValid) {
      onSearchSubmit(props.searchText, props.searchOptions)
    } 
  }

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        className="search-form__input"
        type= "text"
        id="search"
        name="search"
        placeholder="Search.."
        value={props.searchText}
        onChange={handleSearchInput}
      />
      <button 
        className="search-form__button" 
        type="submit" 
      >
      </button>
      <FilterCheckbox 
        label="Short film"
        value={props.searchOptions}
        onChange={handleFilterChange}
      />
      {(name.isError && name.isEmpty) && <p className='form__error-message'>Search keyword is required!</p>}
    </form>
  );
}

export default SearchForm;