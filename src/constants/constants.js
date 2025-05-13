export const DEFAULT_JOBS = [
  {
    "id": "1",
    "logo": "../images/Amazon_logo.png",
    "company": "Amazon",
    "position": "Full Stack Developer",
    "experience": "1-3 yr",
    "location": "Chennai",
    "workType": "Full-time",
    "salary": "2.5LPA",
    "createdAt": new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    "description": [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized"
    ]
  },
  {
    "id": "2",
    "logo": "../images/Tesla_logo.png",
    "company": "Tesla",
    "position": "Node Js Developer",
    "experience": "1-3 yr",
    "location": "Bangalore",
    "workType": "Full-time",
    "salary": "2.5LPA",
    "createdAt": new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 24 hours ago
    "description": [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized"
    ]
  },
  {
    "id": "3",
    "logo": "../images/Swiggy_logo.png",
    "company": "Swiggy",
    "position": "UX/UI Designer",
    "experience": "1-3 yr",
    "location": "Hyderabad",
    "workType": "Part-time",
    "salary": "3.5LPA",
    "createdAt": new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    "description": [
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
    "location": "Mumbai",
    "workType": "Full-time",
    "salary": "4.5LPA",
    "createdAt": new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
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
    "location": "Delhi",
    "workType": "Intern",
    "salary": "5.5LPA",
    "createdAt": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
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
    "location": "Kolkata",
    "workType": "Part-time",
    "salary": "6.5LPA",
    "createdAt": new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
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
    "location": "Pune",
    "workType": "Full-time",
    "salary": "7.5LPA",
    "createdAt": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago (1 month)
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
    "location": "Chennai",
    "workType": "Full-time",
    "salary": "1.5LPA",
    "createdAt": new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
    "description": [
      "A user-friendly interface lets you browse stunning photos and videos",
      "Filter destinations based on interests and travel style, and create personalized"
    ]
  }
  
];

// API URL constant
export const API_URL = "https://jobportal-backend-new.vercel.app/api/jobs";

// Job types
export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  // "Contract",
  "Intern",
  // "Remote",
  // "Onsite",
  // "Hybrid"
];

// Locations
export const LOCATIONS = [
  "Chennai",
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Pune",
  "Noida",
  "Gurgaon"
];

// Experience levels
export const EXPERIENCE_LEVELS = [
  "0-1 yr",
  "1-3 yr",
  "3-5 yr",
  "5+ yr"
]; 