import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import "./CreateJobForm.css";
import { addNewJob } from "../../App";
import { API_URL, JOB_TYPES, LOCATIONS, EXPERIENCE_LEVELS } from "../../constants/constants";

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
    experience: EXPERIENCE_LEVELS[1], // default to "1-3 yr"
  });

  const [errors, setErrors] = useState({});

  const popupRef = useRef(null);
  const dateInputRef = useRef(null);

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

  const validateForm = () => {
    const newErrors = {};
    if (parseFloat(formData.salaryMin) > parseFloat(formData.salaryMax)) {
      newErrors.salary = "Minimum salary cannot be greater than maximum salary";
    }
    if (new Date(formData.deadline) < new Date()) {
      newErrors.deadline = "Deadline cannot be in the past";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    // Calculate average salary and convert to LPA format
    const minSalary = parseFloat(formData.salaryMin);
    const maxSalary = parseFloat(formData.salaryMax);
    const averageSalary = ((minSalary + maxSalary) / 2).toFixed(1);
    const salaryInLPA = `${averageSalary}LPA`;

    const newJob = {
      logo: `../images/${formData.companyName}_logo.png`,
      company: formData.companyName,
      position: formData.jobTitle,
      experience: formData.experience,
      location: formData.location,
      workType: formData.jobType,
      salary: salaryInLPA,
      description: [
        formData.description,
        "Filter destinations based on interests and travel style, and create personalized"
      ],
      deadline: formData.deadline,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job");
      }

      const data = await response.json();
      setJobs(prevJobs => [...prevJobs, data]);
      alert("Job posted successfully! Please check the job list page to see the new job.");
      onClose();
      window.location.reload(); // Reload the page after successful job posting
    } catch (error) {
      console.error("Error posting job:", error);
      alert(error.message || "Failed to post job. Please try again.");
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
      logo: `../images/${formData.companyName}_logo.png`,
      company: formData.companyName,
      position: formData.jobTitle,
      experience: formData.experience,
      location: formData.location,
      workType: formData.jobType,
      salary: `${formData.salaryMax} LPA`,
      description: [formData.description],
      status: "draft",
      createdAt: new Date().toISOString()
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
                  style={{ color: formData.location ? "#000000" : "#BCBCBC" }}
                >
                  <option value="" disabled>
                    Choose Preferred Location
                  </option>
                  {LOCATIONS.map((location) => (
                    <option key={location} value={location} style={{ color: "#000000" }}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <div className="select-wrapper">
                <select
                  style={{ color: formData.jobType ? "#000000" : "#BCBCBC" }}
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Job Type
                  </option>
                  {JOB_TYPES.map((type) => (
                    <option key={type} value={type} style={{ color: "#000000" }}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">Salary Range (LPA)</label>
              <div className="salary-inputs">
                <div className="salary-input-container">
                  <span className="currency-symbol">₹</span>
                  <input
                    className="input-narrow"
                    type="number"
                    id="salaryMin"
                    name="salaryMin"
                    placeholder="Min LPA"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
                <div className="salary-input-container">
                  <span className="currency-symbol">₹</span>
                  <input
                    className="input-narrow"
                    type="number"
                    id="salaryMax"
                    name="salaryMax"
                    placeholder="Max LPA"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              {errors.salary && (
                <span className="error-message">{errors.salary}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="deadline">Application Deadline</label>
              <div className="date-input-container" style={{ position: "relative" }}>
                <input
                  className="input-wide"
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  ref={dateInputRef}
                  style={{ color: formData.deadline ? "#000000" : "#BCBCBC" }}
                />
                <Calendar
                  className="calendar-icon"
                  style={{ color: "#BCBCBC", cursor: "pointer" }}
                  size={20}
                  onClick={() => dateInputRef.current && dateInputRef.current.showPicker && dateInputRef.current.showPicker()}
                />
              </div>
              {errors.deadline && (
                <span className="error-message">{errors.deadline}</span>
              )}
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
