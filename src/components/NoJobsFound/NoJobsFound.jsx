import React from 'react';
import './NoJobsFound.css';

const NoJobsFound = ({ message }) => {
  return (
    <div className="no-jobs-container">
      <div className="no-jobs-content">
        <h2>Oops!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NoJobsFound; 