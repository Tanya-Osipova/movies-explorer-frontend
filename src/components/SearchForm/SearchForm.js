import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useInput from '../../hooks/useInput';
import './SearchForm.css';

function SearchForm({ onSearchSubmit,...props }) {
  const name = useInput('', {isEmpty: true})
  
  const handleFilterChange = () => {
    console.log(props)
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
    //name.isError = true
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
      {(name.isError && name.isEmpty) && <p className='form__error-message'>Search keyword is required!</p>}

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
    </form>
  );
}

export default SearchForm;