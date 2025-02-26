import axios from "axios";

export const BASE_URL_API = "http://localhost:2025";

export const apiCall = axios.create({
  baseURL: BASE_URL_API,
});
