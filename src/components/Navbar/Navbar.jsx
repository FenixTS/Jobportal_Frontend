import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import CreateJobForm from '../../Pages/CreateJobForm/CreateJobForm';

const Navbar = ({ setJobs }) => {
  const [showJobForm, setShowJobForm] = useState(false);
  const modalRef = useRef(null);

  const toggleJobForm = () => {
    setShowJobForm(!showJobForm);
  };

  // Close modal on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowJobForm(false);
      }
    };

    if (showJobForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showJobForm]);

  return (
    <>
      <div className="admin-navbar">
        <div className="navbar-content">
          <img src={"https://www.cybermindworks.com/images/cmwlogo.svg"} alt="Company Logo" className="navbar-logo" />
          <ul className="navbar-menu">
            <li>Home</li>
            <li>Find Jobs</li>
            <li>Find Talents</li>
            <li>About us</li>
            <li>Testimonials</li>
          </ul>
          <button className="create-jobs-btn" onClick={toggleJobForm}>Create Jobs</button>
        </div>
      </div>

      {showJobForm && (
        <div className="modal-overlay">
          <div className="modal-container" ref={modalRef}>
            <div className="modal-header">
              <button className="close-modal-btn" onClick={toggleJobForm}>×</button>
            </div>
            <CreateJobForm onClose={toggleJobForm} setJobs={setJobs} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
