// import { useCookies } from "react-cookie";
import axios from "axios";
import Tokenservice from "./token-service";
import {useContext} from 'react'
import {LoginContext} from "../components/helper/Context"
import { useCallback } from "react";

 const{getLocalRefreshToken}=Tokenservice()

export default function FeedService() {
  // const [cookies] = useCookies(["token"]);
  const {accessTokenMemory,setAccessTokenMemory}= useContext(LoginContext);
  let accessTokenMemoryTmp=accessTokenMemory;
  const http = axios.create({
    baseURL:
    process.env.REACT_APP_BASE_URL,
   
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
      if (err.response.status===401) {
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
  async function addFeedData(formData) {
    const data = await http.post("/feeds/add/", formData).then((res) => res);
    console.log(data);
  }

  //Get all feeds 

  // async function getFeedData() {
  //   const data = await http.get("/feeds/").then((res) => res);
  //   return data;
  // }

  const getFeedData = useCallback (async function getFeedData() {
    const data = await http.get("/feeds").then((res) => res.data.Result);
    return data;
    // eslint-disable-next-line
  } ,[])

  
  async function deleteFeedbyId(id) {
    const data=await http.delete(`/feeds/deleteFeed/${id}`).then((res) => res);
    return data;

  }

  async function updateFeedById(Id, formData) {
    const data = await http.put(`/feeds/updateFeed/${Id}`, formData).then((res) => res);
    console.log(data);
  }

  
  return {
    updateFeedById,
    getFeedData,
    deleteFeedbyId,
    addFeedData
  
  };
}
