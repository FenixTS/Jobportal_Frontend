import React from 'react'
import { FaSearch } from 'react-icons/fa'
             
function Search({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="filter-item">
      <FaSearch className="icon search-icon" color="#686868" />
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