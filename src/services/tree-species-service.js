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

  async function getAllTreeSpecies() {
    const data = await http.get("/species").then((res) => res.data.Result);
    return data;
  }

  async function deleteTreeSpeciesById(Id) {
    const data = await http.put("/species/deleteSpecies/" + Id).then((res) => res);
    console.log(
      data.status === 200
        ? data.data.message
        : "Oops! something went wrong when deleting Tree"
    );
    // return data;
  }

  async function updateTreeSpeciesById(Id, treeData) {
    const data = await http.put("/species/updateSpecies/" + Id, treeData).then((res) => res);
    console.log(data);
    // return data;
  }

  async function addNewTreeSpecies(treeData) {
    const data = await http.post("/species/add", treeData).then((res) => res);
    console.log(data);
    // return data;
  }

  return {
    getAllTreeSpecies,
    deleteTreeSpeciesById,
    updateTreeSpeciesById,
    addNewTreeSpecies,
  };
}
