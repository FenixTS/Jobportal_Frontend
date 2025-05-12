import React from 'react'
import { FaSearch } from 'react-icons/fa'
             
function Search({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="filter-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 80 80" fill="none" stroke="gray" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="30" cy="30" r="25" />
  <line x1="47" y1="48" x2="70" y2="70" />
</svg>
      <input
        
        type="text"
        placeholder="Search By Job Title, Role"
        className="filter-input"
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search