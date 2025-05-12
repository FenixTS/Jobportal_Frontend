import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { JOB_TYPES } from '../../../constants/constants';


const JobType = ({ selectedJobType, setSelectedJobType }) => {
  const handleJobTypeChange = (e) => {
    setSelectedJobType(e.target.value);
  };

  return (
    <div className="filter-item">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="64" viewBox="0 0 24 24" fill="none" stroke="gray" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  {/* <!-- User circle (head) --> */}
  <circle cx="8" cy="6" r="4" />
  {/* <!-- User body (broader shoulders, with a gap from head) --> */}
  <path d="M1 20c0-4 3.5-7 7.5-7S16 16 16 20" />
  {/* <!-- Sound waves --> */}
  <path d="M17 8c.7.7 1 1.7 1 2.5s-.3 1.8-1 2.5" />
  <path d="M19.5 5.5c1.3 1.3 2 3 2 5s-.7 3.7-2 5" />
</svg>
      <select 
        className="filter-dropdown"
        value={selectedJobType}
        onChange={handleJobTypeChange}
      >
        <option value="">Job type</option>
        {JOB_TYPES.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

export default JobType;