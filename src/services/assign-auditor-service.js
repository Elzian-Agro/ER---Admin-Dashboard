import {useContext} from 'react'
import axios from "axios";
import Tokenservice from "./token-service";
import {LoginContext} from "../components/helper/Context"

export default function AuditorService() {
  const{getLocalRefreshToken,getLocalAccessToken,updateNewAccessToken}=Tokenservice()
  const {setAccessTokenMemory ,accessTokenMemory}= useContext(LoginContext);
  const http = axios.create({
    baseURL:
      "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token":getLocalAccessToken(),
    },
  });

  http.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
      if (token) {
        config.headers["x-auth-token"] =token;
      }
      return config;
    },(error) => {
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
            updateNewAccessToken(accessToken);
            return http(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );

  async function getLandOwnersGapCreateLastAuditorDate() {
    const data = await http.get("/landOwners/getLandOwners/getLandOwnersGapCreateLastAuditorDate").then((res) => res);
    return data;
  }

  async function getusers() {
    const data = await http.get("/users/").then((res) => res);
    return data;
  }
  async function assigningAuditors(id,auditorId) {
    const data = await http.put(`/landowners/updateAssignAuditorId/${id}`,{assignAuditorID: auditorId}).then((res) => res);
    return data;
  } 
  return {
    getLandOwnersGapCreateLastAuditorDate,
    getusers,
    assigningAuditors,
  };
}
