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

  async function getLandOwners() {
    const data = await http.get("/landOwners").then((res) => res.data.Result);
    return data;
  }

  async function deleteLandOwnerById(Id) {
    const data = await http.put("/landOwners/deleteLandowner/" + Id).then((res) => res);
    console.log(
      data.status === 200
        ? data.data.message
        : "Oops! something went wrong when deleting Tree"
    );
    // return data;
  }

  async function updateLandOwnerById(Id, landData) {
    const data = await http.put("/landOwners/updateLandowner/" + Id, landData).then((res) => res);
    console.log(data);
    // return data;
  }

  async function addNewLandOwner(landData) {
    const data = await http.put("/landOwners/add", landData).then((res) => res);
    console.log(data);
    // return data;
  }

  async function approveLandOwnerById(Id) {
    const data = await http.put("/landOwners/approveLandowner/" + Id).then((res) => res);
    console.log(data);
    // return data;
  }

  async function unApproveLandOwnerById(Id) {
    const data = await http.put("/landOwners/unApproveLandowner/" + Id).then((res) => res);
    console.log(data);
    // return data;
  }

  return {
    getLandOwners,
    deleteLandOwnerById,
    updateLandOwnerById,
    addNewLandOwner,
    approveLandOwnerById,
    unApproveLandOwnerById,
  };
}
