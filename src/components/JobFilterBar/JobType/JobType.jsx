import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { JOB_TYPES } from '../../../constants/constants';


const JobType = ({ selectedJobType, setSelectedJobType }) => {
  const handleJobTypeChange = (e) => {
    setSelectedJobType(e.target.value);
  };

  return (
    <div className="filter-item">
      <FaUserTie className="icon" color="#686868" />
      <select 
        className="filter-dropdown"
        value={selectedJobType}
        onChange={handleJobTypeChange}
      >
        <option value="">All Job Types</option>
        {JOB_TYPES.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default JobType;