import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import JobFilterBar from '../../components/JobFilterBar/Index/JobFilterBar';
import './Index.css';

function Index({ 
  setJobs, 
  search, 
  setSearch, 
  selectedLocation, 
  setSelectedLocation,
  selectedJobType,
  setSelectedJobType,
  selectedSalaryRange,
  setSelectedSalaryRange
}) {
  return (
    <div className="main-container">
      <Navbar setJobs={setJobs} />
      <JobFilterBar 
        search={search} 
        setSearch={setSearch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        selectedSalaryRange={selectedSalaryRange}
        setSelectedSalaryRange={setSelectedSalaryRange}
      />
    </div>
  );
}

export default Index;
