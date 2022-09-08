//import { useCookies } from "react-cookie";
import axios from "axios";
import Tokenservice from "./token-service";
import { useContext } from "react";
import { LoginContext } from "../components/helper/Context";

export default function DataService() {
  //const [cookies] = useCookies(["token"]);
  const { getLocalRefreshToken } = Tokenservice();

  const { accessTokenMemory, setAccessTokenMemory } = useContext(LoginContext);
  let accessTokenMemoryTmp = accessTokenMemory;
  const http = axios.create({
    baseURL:
      "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": accessTokenMemoryTmp,
    },
  });
  http.interceptors.request.use(
    (config) => {
      const token = accessTokenMemoryTmp;
      if (token) {
        config.headers["x-auth-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  http.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err) {
        // access token expired
        if (err && !originalConfig._retry) {
          // handle infinite loop
          originalConfig._retry = true;
          try {
            const rs = await http.post("/admin/getNewAccessToken", {
              refreshToken: getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;
            accessTokenMemoryTmp = accessToken;
            setAccessTokenMemory(accessTokenMemoryTmp);
            // updateNewAccessToken(accessToken);
            return http(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
  async function getPlantedTrees() {
    const data = await http.get("/trees").then((res) => res.data.Result);
    console.log(data);
    return data;
  }

  async function updatePlantedTree(Id) {
    const data = await http.put("/trees/updateTree/" + Id).then((res) => res);
    console.log(data);
    // return data;
  }

  async function deletePlantedTree(Id) {
    const data = await http.put("/trees/deleteTree/" + Id).then((res) => res);
    console.log(
      data.status === 200
        ? data.data.message
        : "Oops! something went wrong when deleting Tree"
    );
    // return data;
  }

  async function getAuditorById(id) {
    if (!id) return;
    const data = await http.get("/users/" + id).then((res) => res.data.Result);
    console.log(data);
    //  return data
  }

  async function getLandOwnerById(id) {
    if (!id) return;
    const data = await http
      .get("/landOwners/" + id)
      .then((res) => res.data.Result);
    console.log(data);
    return data[0].landOwnerName;
  }

  async function getProfile() {
    const data = await http
      .get("/admin/getProfile")
      .then((res) => res.data.Result);
    return data[0];
  }

  return {
    getPlantedTrees,
    updatePlantedTree,
    deletePlantedTree,
    getLandOwnerById,
    getAuditorById,
    getProfile,
  };
}
