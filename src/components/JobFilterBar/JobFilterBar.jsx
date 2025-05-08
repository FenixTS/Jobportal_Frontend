import React from "react";
import "./JobFilterBar.css";
import { FaSearch, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import SalaryRange from "../SalaryRange/SalaryRange";

const JobFilterBar = () => {
  return (
    <div className="job-filter-container">
      <div className="filter-item">
      
        <FaSearch className="icon search-icon" color="#686868" />
       
        <input
          type="text"
          placeholder="Search By Job Title, Role"
          className="filter-input"
        />
      </div>

      <div className="divider" />

      <div className="filter-item">
      <FaMapMarkerAlt className="icon" color="#686868" />
      
        <select className="filter-dropdown"> 
          <option>Preferred Location</option>
          <option>Chennai</option>
          <option>Bangalore</option>
          <option>Remote</option>
        </select>
      </div>

      <div className="divider" />

      <div className="filter-item">
      <FaUserTie className="icon" color="#686868" />
      
        <select className="filter-dropdown">
          <option>Job type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
        </select>
      </div>

      <div className="divider" />

      <SalaryRange/>

      {/* <div className="salary-section">
        <label>Salary Per Month</label>
        <div className="salary-range">
          <input type="range" min="10000" max="100000" />
          <div className="salary-values">₹50k - ₹80k</div>
        </div>
      </div> */}
    </div>
  );
};

export default JobFilterBar;
