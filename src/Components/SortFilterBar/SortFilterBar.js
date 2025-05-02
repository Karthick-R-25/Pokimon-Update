import React from 'react';
import './sortfilterbar.css';

const SortFilterBar = ({ onSortChange, onTypeChange, types = [], currentSort }) => {
  return (
    <div >
      <select  className="type-sort" value={currentSort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sort By</option>
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>

      <select className="type-select" onChange={(e) => onTypeChange(e.target.value)}>
        <option value="">All Powers</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortFilterBar;

