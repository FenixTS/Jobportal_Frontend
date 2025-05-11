import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import JobFilterBar from '../../components/JobFilterBar/JobFilterBar';
import './Index.css'; // Add this line

function Index({ setJobs, search, setSearch }) {
  return (
    <div className="main-container">
      <Navbar setJobs={setJobs} />
      <JobFilterBar search={search} setSearch={setSearch} />
    </div>
  );
}

export default Index;
