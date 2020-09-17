import axios from "axios";
import config from "../config/index";

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json;charse=UTF-8"
  }
});

service.interceptors.request.use(
  config => {
    let token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
