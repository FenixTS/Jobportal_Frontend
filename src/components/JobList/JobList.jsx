import React from 'react';
import './JobList.css';

const JobList = ({
  logo,
  company,
  position,
  experience,
  location,
  workType,
  salary,
  description
}) => {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <div className="logo-container">
          <div className="logo-circle">
            <img src={logo} alt={company} className="company-logo" />
          </div>
        </div>
        <div className="time-badge">24h Ago</div>
      </div>

      <div className="job-card-content">
        <h3 className="job-title">{position}</h3>

        <div className="job-details">
          <div className="job-detail">
            <svg viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" fill="#9CA3AF" />
            </svg>
            <span>{experience} Exp</span>
          </div>

          <div className="job-detail">
            <svg viewBox="0 0 24 24">
              <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" fill="#9CA3AF" />
            </svg>
            <span>{location}</span>
          </div>

          <div className="job-detail">
            <svg viewBox="0 0 24 24">
              <path d="M21,5C19.89,4.65 18.67,4.5 17.5,4.5C15.55,4.5 13.45,4.9 12,6C10.55,4.9 8.45,4.5 6.5,4.5C4.55,4.5 2.45,4.9 1,6V20.65C1,20.9 1.25,21.15 1.5,21.15C1.6,21.15 1.65,21.1 1.75,21.1C3.1,20.45 5.05,20 6.5,20C8.45,20 10.55,20.4 12,21.5C13.35,20.65 15.8,20 17.5,20C19.15,20 20.85,20.3 22.25,21.05C22.35,21.1 22.4,21.1 22.5,21.1C22.75,21.1 23,20.85 23,20.6V6C22.4,5.55 21.75,5.25 21,5M21,18.5C19.9,18.15 18.7,18 17.5,18C15.8,18 13.35,18.65 12,19.5V8C13.35,7.15 15.8,6.5 17.5,6.5C18.7,6.5 19.9,6.65 21,7V18.5Z" fill="#9CA3AF" />
            </svg>
            <span>{salary}</span>
          </div>
        </div>

        <ul className="job-description">
          {description.map((item, index) => (
            <li key={index}>
              <span className="bullet">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobList;
