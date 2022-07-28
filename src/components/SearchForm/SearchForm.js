import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <form className="search-form">
      <input 
        className="search-form__input"
        type="text" 
        id="search" 
        name="search" 
        placeholder="Search.."
      />
      <button className="search-form__button" type="submit"></button>
      <FilterCheckbox 
        label="Short film"
        value={checked}
        onChange={handleChange}
      />
    </form>
  );
}

export default SearchForm;