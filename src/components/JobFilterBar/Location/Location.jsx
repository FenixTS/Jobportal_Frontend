import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LOCATIONS } from '../../../constants/constants';

const Location = ({ selectedLocation, setSelectedLocation }) => {
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="filter-item">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25.01" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" />
  <circle cx="12" cy="10" r="3" />
</svg>
      <select 
        className="filter-dropdown"
        value={selectedLocation}
        onChange={handleLocationChange}
      > 
        <option value="">Preferred Locations</option>
        {LOCATIONS.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>
    </div>
  );
};

export default Location; 