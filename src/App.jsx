// App.js
import React, { useEffect, useState } from 'react';
import JobList from './components/JobList/JobList';
import './App.css';
import Index from './Pages/Index/Index';
import { DEFAULT_JOBS, API_URL } from './constants/constants';

// Function to add a new job
export const addNewJob = (newJob) => {
  return newJob;
};

const App = () => {
  const [jobs, setJobs] = useState(DEFAULT_JOBS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
        // Use default data when API fails
        setJobs(DEFAULT_JOBS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term, location, and job type
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(search.toLowerCase()) || 
                         job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesJobType = !selectedJobType || job.workType === selectedJobType;
    return matchesSearch && matchesLocation && matchesJobType;
  });

  return (
    <>
      <Index 
        search={search} 
        setSearch={setSearch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
      />
      <div className="app-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-message">
            <div className="job-listings">
              {filteredJobs.map((job) => (
                <JobList key={job.id} {...job} />
              ))}
            </div>
          </div>
        ) : (
          <div className="job-listings">
            {filteredJobs.map((job) => (
              <JobList key={job.id} {...job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
