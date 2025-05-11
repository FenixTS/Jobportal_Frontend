import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LOCATIONS } from '../../../constants/constants';

const Location = ({ selectedLocation, setSelectedLocation }) => {
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="filter-item">
      <FaMapMarkerAlt className="icon" color="#686868" />
      <select 
        className="filter-dropdown"
        value={selectedLocation}
        onChange={handleLocationChange}
      > 
        <option value="">All Locations</option>
        {LOCATIONS.map((location, index) => (
          <option key={index} value={location}>{location}</option>
        ))}
      </select>
    </div>
  );
};

export default Location; 