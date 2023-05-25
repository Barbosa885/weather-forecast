import axios from "axios"

const api = axios.create({
  baseURL:
    "https://api.tomorrow.io/v4",
});

export default api;
