import axios from "axios";

export default axios.create({
  // REST API's url
  baseURL: "http://localhost:4000/admin",
  headers: {
    "Content-type": "application/json",
  },
});
