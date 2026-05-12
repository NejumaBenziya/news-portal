import axios from "axios";

// Create a reusable Axios instance
const API = axios.create({
  
  // Base URL from environment variables
  // Example:
  // Development -> http://localhost:5000/api
  // Production  -> Render backend URL
  baseURL: process.env.REACT_APP_API_URL

});

// Export API instance to use across the project
export default API;