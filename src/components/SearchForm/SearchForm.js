import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ searchTerm, onSearchInput, onSearchSubmit }) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <form className="search-form" onSubmit={onSearchSubmit}>
      <input 
        className="search-form__input"
        type="text" 
        id="search" 
        name="search" 
        placeholder="Search.."
        value={searchTerm}
        onInputChange={onSearchInput}
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
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchForm;