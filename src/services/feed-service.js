// import { useCookies } from "react-cookie";
import axios from "axios";
import Tokenservice from "./token-service";
import {useContext} from 'react'
import {LoginContext} from "../components/helper/Context"

 const{getLocalRefreshToken}=Tokenservice()

export default function DataService() {
  // const [cookies] = useCookies(["token"]);
  const {accessTokenMemory,setAccessTokenMemory}= useContext(LoginContext);
  let accessTokenMemoryTmp=accessTokenMemory;
  const http = axios.create({
    baseURL:
    "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": accessTokenMemoryTmp
    },
  });

  http.interceptors.request.use(
    (config) => {
      const token = accessTokenMemoryTmp
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
            //console.log("response", rs);
            const { accessToken } = rs.data;
            //console.log("NewAccessToken", accessToken);
            accessTokenMemoryTmp=accessToken;
            setAccessTokenMemory(accessTokenMemoryTmp)
            //updateNewAccessToken(accessToken);
            return http(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
  // async function deleteLandOwnerById(Id) {
  //   const data = await http.put("/landOwners/deleteLandowner/" + Id).then((res) => res);
  //   console.log(
  //     data.status === 200
  //       ? data.data.message
  //       : "Oops! something went wrong when deleting Tree"
  //   );
  //   // return data;
  // }

  async function updateFeedById(Id, formData) {
    const data = await http.put("/feeds/updateFeed/" + Id, formData).then((res) => res);
    console.log(data);
    // return data;
  }

//   async function addNewLandOwner(landData) {
//     const data = await http.post("/landOwners/add", landData).then((res) => res);
//     console.log(data);
//     // return data;
//   }

  return {
    // getLandOwners,
    // deleteLandOwnerById,
    updateFeedById,
    // addNewLandOwner,
    // approveLandOwnerById,
    // unApproveLandOwnerById,
  };
}
