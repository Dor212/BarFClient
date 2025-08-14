import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL?.trim() ||
  "https://api.barflyshker.com"; 

export const api = axios.create({
  baseURL,
  withCredentials: true, 
  headers: { "Content-Type": "application/json" },
});