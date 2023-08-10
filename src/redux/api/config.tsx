import axios from "axios";
console.log("process.env.BASE_URL", process.env.REACT_APP_BASE_URL);
const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({
  baseURL,
});
export default instance;
