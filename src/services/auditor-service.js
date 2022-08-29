import axios from "axios";
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
  const{getLocalRefreshToken,getLocalAccessToken,updateNewAccessToken}=Tokenservice()

  const http = axios.create({
    baseURL:
      "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token":getLocalAccessToken()
    },
  });
  http.interceptors.request.use(
    (config) => {
      const token = getLocalAccessToken();
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
           // console.log("response", rs);
            const { accessToken } = rs.data;
           // console.log("NewAccessToken", accessToken);
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
  async function getAuditors() {
    const data = await http.get("/users").then((res) => res.data.Result);
    return data;
  }

  async function getDataForCalculation() {
    const data = await http.get("/auditings/getAuditCalculation").then((res) => res.data.Result);
    return data;
  }
  


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
