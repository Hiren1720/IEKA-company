export const config = {
  BACKEND_API_URL: process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000",
};

console.log(
  "API URL:",
  process.env.REACT_APP_BACKEND_API_URL
);