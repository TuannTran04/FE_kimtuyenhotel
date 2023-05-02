import axios from "axios";
import _ from "lodash";
// import config from "./config";
// import config from "./next.conf.js";
// import * as dotenv from "dotenv";
// dotenv.config();
// import dotenv from "dotenv";
// dotenv.config();

const instance = axios.create({
  // baseURL: "http://localhost:9090",
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // withCredentials: true
});

instance.interceptors.response.use((response) => {
  const { data } = response;
  return response.data;
});

export default instance;
