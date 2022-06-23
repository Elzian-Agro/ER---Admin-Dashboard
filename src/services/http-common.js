import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
  headers: {
    "Content-type": "application/json",
    // "x-auth-token": cookie
  },
});
