import { useCookies } from "react-cookie";
import axios from "axios";

export default function DataService() {
  const [cookies] = useCookies(["token"]);

  const http = axios.create({
    baseURL:
      "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": cookies.token,
    },
  });

  async function getTrees() {
    const data = await http.get("/trees").then((res) => res.data.Result);
    return data;
  }

  async function getAuditorById(id) {
    const data = await http.get("/users/" + id).then((res) => res.data.Result);
    console.log(data);
    //  return data
  }

  async function getLandOwnerById(id) {
    const data = await http
      .get("/landOwners/" + id)
      .then((res) => res.data.Result);
    return data[0].landOwnerName;
  }

  async function getProfile() {
    const data = await http
      .get("/admin/getProfile")
      .then((res) => res.data.Result);
    return data[0];
  }

  return { getTrees, getLandOwnerById, getAuditorById, getProfile };
}
