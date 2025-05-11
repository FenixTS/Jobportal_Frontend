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
  setSelectedJobType 
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
      />
    </div>
  );
}

export default Index;
