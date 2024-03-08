import axios from "axios";

const apiCall = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  withXSRFToken: true,
});

export const asset = (path) => {
  return `http://localhost:8000/storage/${path}`;
};

export const assets = (path) =>
  axios.create({
    baseURL: `http://localhost:8000/storage/${path}`,
    withCredentials: true,
    withXSRFToken: true,
  });

export default apiCall;
