// App.js
import React, { useEffect, useState } from 'react';
import JobList from './components/JobList/JobList';
import NoJobsFound from './components/NoJobsFound/NoJobsFound';
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
  const [selectedSalaryRange, setSelectedSalaryRange] = useState({ min: 10000, max: 80000 });

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

  // Helper function to convert salary string to number
  const convertSalaryToNumber = (salaryStr) => {
    // Remove 'LPA' and convert to number
    const numericValue = parseFloat(salaryStr.replace('LPA', ''));
    // Convert LPA to monthly salary (multiply by 100000 and divide by 12)
    return (numericValue * 100000) / 12;
  };

  // Filter jobs based on all criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(search.toLowerCase()) || 
                         job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    const matchesJobType = !selectedJobType || job.workType === selectedJobType;
    
    // Convert job salary to monthly value for comparison
    const jobSalary = convertSalaryToNumber(job.salary);
    const matchesSalary = jobSalary >= selectedSalaryRange.min && 
                         jobSalary <= selectedSalaryRange.max;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  // Check if no jobs are found due to salary range
  const isNoJobsDueToSalary = filteredJobs.length === 0 && 
    (selectedSalaryRange.min !== 27000 || selectedSalaryRange.max !== 64000);

  return (
    <>
      <Index 
        search={search} 
        setSearch={setSearch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedJobType={selectedJobType}
        setSelectedJobType={setSelectedJobType}
        selectedSalaryRange={selectedSalaryRange}
        setSelectedSalaryRange={setSelectedSalaryRange}
        setJobs={setJobs}
      />
      <div className="app-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-message">
            <div className="job-listings">
              {filteredJobs.map((job) => (
                <JobList key={job._id} {...job} />
              ))}
            </div>
          </div>
        ) : isNoJobsDueToSalary ? (
          <NoJobsFound 
            message="No jobs found . Please adjust the filter to see more opportunities."
          />
        ) : (
          <div className="job-listings">
            {filteredJobs.map((job) => (
              <JobList key={job._id} {...job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
