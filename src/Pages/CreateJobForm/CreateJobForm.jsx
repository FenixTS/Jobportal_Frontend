import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import "./CreateJobForm.css";
import { addNewJob } from "../../App";
import { LOCATIONS, JOB_TYPES } from "../../constants/constants";
import { convertToLPA } from "../../utils/salaryUtils";

const CreateJobForm = ({ onClose, setJobs }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);

    try {
      // Convert both min and max salaries to LPA format
      const monthlySalaryMin = parseFloat(formData.salaryMin);
      const monthlySalaryMax = parseFloat(formData.salaryMax);

      if (isNaN(monthlySalaryMin) || isNaN(monthlySalaryMax)) {
        throw new Error('Please enter valid salary amounts');
      }

      if (monthlySalaryMin > monthlySalaryMax) {
        throw new Error('Minimum salary cannot be greater than maximum salary');
      }

      const salaryMinLPA = convertToLPA(monthlySalaryMin);
      const salaryMaxLPA = convertToLPA(monthlySalaryMax);
      
      const newJob = {
        id: Date.now().toString(),
        logo: `../images/${formData.companyName}_logo.png`,
        company: formData.companyName,
        position: formData.jobTitle,
        experience: formData.experience,
        location: formData.location,
        workType: formData.jobType,
        salary: `${salaryMinLPA} - ${salaryMaxLPA}`,
        description: [
          formData.description,
          
          "Filter destinations based on interests and travel style, and create personalized",
        ],
        postedAt: new Date().toISOString(),
        status: 'active'
      };

      const response = await fetch(
        API_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        }
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      console.log('Job created successfully:', data);
      
      if (setJobs) {
        setJobs(prevJobs => [...prevJobs, data]);
      }
      
      if (onClose) {
        onClose();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating job:', error);
      alert("Error creating job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    // Validate required fields
    if (
      !formData.jobTitle ||
      !formData.companyName ||
      !formData.location ||
      !formData.jobType ||
      !formData.salaryMax ||
      !formData.description
    ) {
      alert("Please fill in all required fields before saving draft");
      return;
    }

    setIsSubmitting(true);

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
      status: "draft",
    };

    try {
      const response = await fetch(
        "https://jobportal-backend-new.vercel.app/api/drafts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(draftJob),
        }
      );

      if (response.ok) {
        alert("Draft saved successfully");
        onClose();
      } else {
        alert("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Error saving draft");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="popup-overlay">
      <div
        className={`popup-container ${isSubmitting ? "submitting" : ""}`}
        ref={popupRef}
      >
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
                  {LOCATIONS.map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
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
                  {JOB_TYPES.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Draft"}{" "}
              <ChevronDown size={18} strokeWidth={2.5} />
            </button>
            <button
              type="submit"
              className="publish-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish"}{" "}
              <span className="right-arrow">»</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;
