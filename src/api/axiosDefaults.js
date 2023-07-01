// Importing axios library for making HTTP requests
import axios from "axios";

// Setting the baseURL for axios. All requests will be appended to this URL.
axios.defaults.baseURL = "https://gameversity-api.herokuapp.com/";

// Setting the default 'Content-Type' for POST requests
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

// Setting withCredentials to true to send cookies with request
axios.defaults.withCredentials = true;

// Creating and exporting an axios instance for making requests
export const axiosReq = axios.create();

// Creating and exporting another axios instance for handling responses
export const axiosRes = axios.create();
