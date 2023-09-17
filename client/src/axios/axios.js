import axios from "axios";

const token = localStorage.getItem("userToken");

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: token ? `Bearer ${token}` : "undefined",
  },
});

export default instance;
