import React from "react";
import "./JobFilterBar.css";
import { FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import SalaryRange from "../SalaryRange/SalaryRange";
import Search from "../Search/Search";

const JobFilterBar = ({ search, setSearch }) => {
  return (
    <div className="job-filter-container">
      <Search search={search} setSearch={setSearch} />
      
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
    </div>
  );
};

export default JobFilterBar;
