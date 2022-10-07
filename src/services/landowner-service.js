//import { useCookies } from "react-cookie";
import axios from "axios";
import { notification} from 'antd';
import {useContext} from 'react'
import {LoginContext} from "../components/helper/Context"
import Tokenservice from "./token-service";


const openNotificationWithIcon = (type,message,title) => {
  if(type==="success"){
    notification[type]({
      message: title,
      description:"Landowner Id : "+message,
    });
  }else{
    notification[type]({
      message: title,
      description:message,
    });
  }
}

export default function DataService() {
  const {accessTokenMemory,setAccessTokenMemory}= useContext(LoginContext);
  let accessTokenMemoryTmp=accessTokenMemory;

  const{getLocalRefreshToken}=Tokenservice()
  //const [cookies] = useCookies(["token"]);

  const http = axios.create({
    baseURL:
    //"http://localhost:4000",
    "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
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
  async function getLandOwners() {
    const data = await http.get("/landOwners").then((res) => res.data.Result);
    return data;
  }

  async function getLandOwnerById(id) {
    const data = await http.get("/landOwners/getSelectLandowner/" + id).then((res) =>res);
    if (data.status === 200) {
      return data;
    } else
     {
      openNotificationWithIcon('Error',"Error get","Error")
    }
  }

  async function deleteLandOwnerById(Id) {
    const data = await http.put("/landOwners/deleteLandowner/" + Id).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Deleted!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Deleting","Error")
    }
  }

  async function updateLandOwnerById(Id, landData) {
    const data = await http.put("/landOwners/updateLandowner/" + Id, landData).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Updated!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Updating","Error")
    }
  }

  async function addNewLandOwner(landData) {
    const data = await http.post("/landOwners/add", landData).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Added!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Adding","Error")
    }
  }

  async function approveLandOwnerById(Id) {
    const data = await http.put("/landOwners/approveLandowner/" + Id).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Approved!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Approving","Error")
    }
    // return data;
  }

  async function unApproveLandOwnerById(Id) {
    const data = await http.put("/landOwners/unApproveLandowner/" + Id).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Unapproved!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Unapproving","Error")
    }
    // return data;
  }

  return {
    getLandOwners,
    getLandOwnerById,
    deleteLandOwnerById,
    updateLandOwnerById,
    addNewLandOwner,
    approveLandOwnerById,
    unApproveLandOwnerById,
  };
}
