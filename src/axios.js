import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:80",
  baseURL: "https://adhub.onrender.com",
});

export default instance;
