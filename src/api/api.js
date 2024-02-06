import axios from "axios";

export const BASE_URL = "https://proyecto-titulo-back.vercel.app/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
