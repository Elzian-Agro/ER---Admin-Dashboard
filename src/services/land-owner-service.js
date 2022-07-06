import axios from "axios";

const headers = {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI5IiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjUxMzAwNDAzfQ.c2TZs11tgHna5irUHCaehVOGzup6YHE-SnTk9G25rtk",
  };

export const landOwnersApi = () => axios.get("http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000/landOwners/", {headers})
