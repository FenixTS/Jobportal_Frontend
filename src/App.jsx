// App.js
import React, { useEffect, useState } from 'react';
import JobList from './components/JobList/JobList';
import './App.css';
import Index from './Pages/Index/Index';

// Get fallback jobs from localStorage or use default data
const getFallbackJobs = () => {
  const storedJobs = localStorage.getItem('fallbackJobs');
  return storedJobs ? JSON.parse(storedJobs) : [
    {
      id: "1",
      logo: "../images/Amazon_logo.png",
      company: "Amazon",
      position: "Full Stack Developer",
      experience: "1-3 yr",
      location: "Onsite",
      workType: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      id: "2",
      logo: "../images/Tesla_logo.png",
      company: "Tesla",
      position: "Node Js Developer",
      experience: "1-3 yr",
      location: "Onsite",
      workType: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      id: "3",
      logo: "../images/Swiggy_logo.png",
      company: "Swiggy",
      position: "UX/UI Designer",
      experience: "1-3 yr",
      location: "Onsite",
      workType: "Onsite",
      salary: "12LPA",
      description: [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      "id": "4",
      "logo": "../images/Amazon_logo.png",
      "company": "Amazon",
      "position": "Full Stack Developer",
      "experience": "1-3 yr",
      "location": "Onsite",
      "workType": "Onsite",
      "salary": "12LPA",
      "description": [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      "id": "5",
      "logo": "../images/Tesla_logo.png",
      "company": "Tesla",
      "position": "Node Js Developer",
      "experience": "1-3 yr",
      "location": "Onsite",
      "workType": "Onsite",
      "salary": "12LPA",
      "description": [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      "id": "6",
      "logo": "../images/Swiggy_logo.png",
      "company": "Swiggy",
      "position": "UX/UI Designer",
      "experience": "1-3 yr",
      "location": "Onsite",
      "workType": "Onsite",
      "salary": "12LPA",
      "description": [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      "id": "7",
      "logo": "../images/Amazon_logo.png",
      "company": "Amazon",
      "position": "Full Stack Developer",
      "experience": "1-3 yr",
      "location": "Onsite",
      "workType": "Onsite",
      "salary": "12LPA",
      "description": [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    },
    {
      "id": "8",
      "logo": "../images/Tesla_logo.png",
      "company": "Tesla",
      "position": "Node Js Developer",
      "experience": "1-3 yr",
      "location": "Onsite",
      "workType": "Onsite",
      "salary": "12LPA",
      "description": [
        "A user-friendly interface lets you browse stunning photos and videos",
        "Filter destinations based on interests and travel style, and create personalized"
      ]
    }
  ];
};

// Export fallbackJobs as a mutable array
export const fallbackJobs = getFallbackJobs();

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message);
        // Use fallback data when API fails
        setJobs(fallbackJobs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Index />
      <div className="app-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error-message">
            {}
            <div className="job-listings">
              {jobs.map((job, index) => (
                <JobList key={index} {...job} />
              ))}
            </div>
          </div>
        ) : (
          <div className="job-listings">
            {jobs.map((job, index) => (
              <JobList key={index} {...job} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
