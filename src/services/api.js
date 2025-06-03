import axios from "axios";

const api = axios.create({
  baseURL: "http://my-shop.test",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
