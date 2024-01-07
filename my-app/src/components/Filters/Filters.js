import React from 'react';

function Filters({ onFilterChange }) {
  const handleFilterChange = (event) => {
    onFilterChange(event.target.name, event.target.value);
  };

  return (
    <div>
      <input type="text" name="search" onChange={handleFilterChange} />
    </div>
  );
}

export default Filters;