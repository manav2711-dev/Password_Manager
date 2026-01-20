import axios from "axios";

// const API_BASE_URL = "http://192.168.1.7:4000/"; // Local Server 
const API_BASE_URL = "https://backend-4wmy.onrender.com"; // Production Server

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 620000,
  // headers: {
  //   "Content-Type": "application/json",
  //   app_name: "HEALTHY_LOOPS",
  // },
});

// api.interceptors.request.use(
//   async (config) => {
//     const sessionToken = await getSessionToken();
//     // console.log("sessionToken", sessionToken);
//     if (sessionToken) {
//       config.headers = config.headers || {};
//       config.headers.API_TOKEN = `bearer_${sessionToken}`
//     }
//     console.log("Request headers:", config.headers);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => {
//     // console.log("Response:", response);
//     return response;
//   },
//   (error) => {
//     // console.error("API Error:", error?.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

export default api;
