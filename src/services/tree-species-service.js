//import { useCookies } from "react-cookie";
import axios from "axios";
import { notification } from "antd";
import {useContext} from 'react'
import {LoginContext} from "../components/helper/Context"

import Tokenservice from "./token-service";
import { useCallback } from "react";

const openNotificationWithIcon = (type, message, title) => {
  if (type === "success") {
    notification[type]({
      message: title,
      description: "Auditor Id : " + message,
    });
  } else {
    notification[type]({
      message: title,
      description: message,
    });
  }
};

export default function DataService() {
 const{getLocalRefreshToken}=Tokenservice()
  //const [cookies, setCookie] = useCookies(["token"]); 
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
      // console.log(err.response.status)
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
           // console.log("NewAccessToken", accessToken);
           accessTokenMemoryTmp=accessToken;
            setAccessTokenMemory(accessTokenMemoryTmp)
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

  const getAllTreeSpecies = useCallback (async function getAllTreeSpecies() {
    const data = await http.get("/species").then((res) => res.data.Result);
    return data;
    // eslint-disable-next-line
  } ,[])

  async function deleteTreeSpeciesById(Id) {
    const data = await http
      .put("/species/deleteSpecies/" + Id)
      .then((res) => res);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Deleted!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Deleting", "Error");
    }
  }
  async function getTreeSpeciesById(Id) {
    const data = await http.get(`/species/${Id}`).then((res) => res);
    return data;
  }

  async function updateTreeSpeciesById(Id, treeData) {
    const data = await http
      .put("/species/updateSpecies/" + Id, treeData)
      .then((res) => res);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Updated!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Updating", "Error");
    }
  }

  async function addNewTreeSpecies(treeData) {
    const data = await http.post("/species/add", treeData).then((res) => res);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Added!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Adding", "Error");
    }
  }

  return {
    getAllTreeSpecies,
    deleteTreeSpeciesById,
    updateTreeSpeciesById,
    addNewTreeSpecies,
    getTreeSpeciesById
  };
}
