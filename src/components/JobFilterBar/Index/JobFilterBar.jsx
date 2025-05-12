import React from "react";
import "./JobFilterBar.css";
import SalaryRange from "../SalaryRange/SalaryRange";
import Search from "../Search/Search";
import Location from "../Location/Location";
import JobType from "../JobType/JobType";

const JobFilterBar = ({ 
  search, 
  setSearch, 
  selectedLocation, 
  setSelectedLocation,
  selectedJobType,
  setSelectedJobType,
  selectedSalaryRange,
  setSelectedSalaryRange
}) => {
  return (
    <div className="job-filter-container">
      <Search search={search} setSearch={setSearch} />
      
      <div className="divider" />

      <Location 
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <div className="divider" />

      <JobType 
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
      />

      <div className="divider" />

      <SalaryRange 
        selectedSalaryRange={selectedSalaryRange}
        setSelectedSalaryRange={setSelectedSalaryRange}
      />
    </div>
  );
};

export default JobFilterBar;
