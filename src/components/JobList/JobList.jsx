import React from "react";
import "./JobList.css";

const JobList = ({
  logo,
  company,
  position,
  experience,
  location,
  workType,
  salary,
  description,
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5A5A5A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="9" cy="6" r="4" />
              <path d="M1 20c0-3.5 3.5-7 8-7s8 3.5 8 7" />
              <line x1="17" y1="11" x2="23" y2="11" />
              <line x1="20" y1="8" x2="20" y2="14" />
            </svg>
            <span>{experience} Exp</span>
          </div>

          <div className="job-detail">
            <svg viewBox="0 0 24 24">
              <path
                d="M4 20V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v12"
                stroke="#5A5A5A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="20"
                width="25"
                height="2"
                rx="1"
                ry="1"
                fill="#5A5A5A"
              />
              <rect
                x="16"
                y="13"
                width="6"
                height="8"
                rx="2"
                stroke="#5A5A5A"
                strokeWidth="2"
                fill="none"
              />
              <rect x="8" y="8" width="4" height="12" rx="2" fill="none" />
              <rect x="7" y="8" width="6" height="2" rx="1" fill="#5A5A5A" />
              <rect x="7" y="11" width="6" height="2" rx="1" fill="#5A5A5A" />
            </svg>
            <span>{workType}</span>
          </div>

          <div className="job-detail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5A5A5A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
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
