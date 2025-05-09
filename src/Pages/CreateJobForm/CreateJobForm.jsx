import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import "./CreateJobForm.css";
import { addNewJob } from "../../App";

const CreateJobForm = ({ onClose, setJobs }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    deadline: "",
    description: "",
    experience: "1-3 yr", // default experience
  });

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now().toString(),
      logo: `../images/${formData.companyName}_logo.png`,
      company: formData.companyName,
      position: formData.jobTitle,
      experience: formData.experience,
      location: formData.location,
      workType: formData.jobType,
      salary: `${formData.salaryMax} LPA`,
      description: [
        formData.description,
        
        "Filter destinations based on interests and travel style, and create personalized"
      ],
    };

    try {
      // First try to post to the API
      const response = await fetch("https://jobportal-backend-new.vercel.app/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }
      // Reload the page to show the new job
      window.location.reload();
// Show success message
alert("Job posted successfully! in Mongodb Atlas");
      // If successful, close the form
      onClose();
    } catch (error) {
      console.log('API request failed, adding to default jobs:', error);
      
      // Add the job to defaultJobs array and update state
      addNewJob(newJob, setJobs);
      
      // Show success message
      alert("Job posted successfully!");
      
      // Close the form
      onClose();
    }
  };

  const handleSaveDraft = async () => {
    // Validate required fields
    if (!formData.jobTitle || !formData.companyName || !formData.location || 
        !formData.jobType || !formData.salaryMax || !formData.description) {
      alert("Please fill in all required fields before saving draft");
      return;
    }

    const draftJob = {
      id: Date.now().toString(),
      logo: `../images/${formData.companyName}_logo.png`,
      company: formData.companyName,
      position: formData.jobTitle,
      experience: formData.experience,
      location: formData.location,
      workType: formData.jobType,
      salary: `${formData.salaryMax} LPA`,
      description: [formData.description],
      status: 'draft'
    };

    try {
      const response = await fetch("https://jobportal-backend-new.vercel.app/api/drafts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(draftJob),
      });

      if (response.ok) {
        alert("Draft saved successfully");
        onClose();
      } else {
        alert("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Error saving draft");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container" ref={popupRef}>
        <h2 className="popup-title">Create Job Opening</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                className="input-wide"
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="Full Stack Developer"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                className="input-wide"
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Amazon, Tesla, Swiggy"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <div className="select-wrapper">
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Choose Preferred Location
                  </option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Noida">Noida</option>
                  <option value="Gurgaon">Gurgaon</option>
                  
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <div className="select-wrapper">
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Job Type
                  </option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">Salary Range</label>
              <div className="salary-inputs">
                <div className="salary-input-container">
                  <span className="currency-symbol">₹</span>
                  <input
                    className="input-narrow"
                    type="number"
                    id="salaryMin"
                    name="salaryMin"
                    placeholder="0"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="salary-input-container">
                  <span className="currency-symbol">₹</span>
                  <input
                    className="input-narrow"
                    type="number"
                    id="salaryMax"
                    name="salaryMax"
                    placeholder="12,00,000"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Application Deadline</label>
              <div className="date-input-container">
                <input
                  className="input-wide"
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
                <Calendar className="calendar-icon" size={20} />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Job Description</label>
            <textarea
              className="input-wider"
              id="description"
              name="description"
              placeholder="Please share a description to let the candidate know more about the job role"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="custom-draft-button"
              onClick={handleSaveDraft}
            >
              Save Draft <ChevronDown size={18} strokeWidth={2.5} />
            </button>
            <button type="submit" className="publish-button">
              Publish <span className="right-arrow">»</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
