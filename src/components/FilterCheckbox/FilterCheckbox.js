import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ label, value, onChange }) => {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__label">
        <input 
          className="filter-checkbox__input"
          type="checkbox"
          checked={value} 
          onChange={onChange}
        />
        <span className="filter-checkbox__slider"></span>
        {label}
      </label>
    </div>
  );
}

export default FilterCheckbox;