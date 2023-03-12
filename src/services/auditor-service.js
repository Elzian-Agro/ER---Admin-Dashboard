import axios from "axios";
import {useContext} from 'react'
import {LoginContext} from "../components/helper/Context"
import { notification } from 'antd';
import Tokenservice from "./token-service";


const openNotificationWithIcon = (type,message,title) => {

  if(type==="success"){
    notification[type]({
      message: title,
      description:"Auditor Id : "+message,
    });
  }else{
    notification[type]({
      message: title,
      description:message,
    });
  }
  
};
export default function AuditorService() {
  const{getLocalRefreshToken}=Tokenservice()
  const {accessTokenMemory,setAccessTokenMemory}= useContext(LoginContext);
  let accessTokenMemoryTmp=accessTokenMemory;


//Base URL Configuration
  const http = axios.create({
    baseURL:
    process.env.REACT_APP_BASE_URL,
    
    headers: {
      "Content-type": "application/json",
      "x-auth-token":accessTokenMemoryTmp
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
            const { accessToken } = rs.data;
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


  //Get Auditors Details
  async function getAuditors() {
    const data = await http.get("/users").then((res) => res.data.Result);
    return data;
  }


  //Get Data From Calculation page
  async function getDataForCalculation() {
    const data = await http.get("/auditings/getAuditCalculation").then((res) => res.data.Result);
    return data;
  }
  

//Update Auditors Details
  async function updateAuditors(user) {
    const data = await http
      .put("/users/updateAll/" + user.id, user)
      .then((res) => res);
      console.log(data.status === 200)
      if (data.status === 200) {
        openNotificationWithIcon('success',"successfully Updated!","Success")
      } else
       {
        openNotificationWithIcon('Error',"Error in Updating","Error")
      }
  }


  //Delete Auditors Details
  async function deleteAuditors(Id) {
    const data = await http
      .put("/users/deleteUser/" + Id, {})
      .then((res) => res);
      console.log(data.status === 200)
      if (data.status === 200) {
        openNotificationWithIcon('success',"successfully Deleted!","Success")
      } else
       {
        openNotificationWithIcon('Error',"Error in Deleting","Error")
      }
  }
  return {
    getAuditors,
    updateAuditors,
    deleteAuditors,
    getDataForCalculation,
  };
}
