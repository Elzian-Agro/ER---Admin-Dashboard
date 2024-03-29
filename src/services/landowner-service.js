//import { useCookies } from "react-cookie";
import axios from "axios";
import { notification } from "antd";
import { useContext } from "react";
import { LoginContext } from "../components/helper/Context";
import Tokenservice from "./token-service";

const openNotificationWithIcon = (type, message, title) => {
  if (type === "success") {
    notification[type]({
      message: title,
      description: "Landowner Id : " + message,
    });
  } else {
    notification[type]({
      message: title,
      description: message,
    });
  }
};

export default function DataService() {
  const { accessTokenMemory, setAccessTokenMemory } = useContext(LoginContext);
  let accessTokenMemoryTmp = accessTokenMemory;

  const { getLocalRefreshToken } = Tokenservice();
  //const [cookies] = useCookies(["token"]);


  //Base URL Configuration
  const http = axios.create({
    baseURL:
    process.env.REACT_APP_BASE_URL,

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
          
            accessTokenMemoryTmp = accessToken;
            setAccessTokenMemory(accessTokenMemoryTmp);
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


  //Get Land Owners Data
  async function getLandOwners() {
    const data = await http.get("/landOwners").then((res) => res.data.Result);
    return data;
  }


  //Get Land Owners Data According to the ID
  async function getLandOwnerById(id) {
    const data = await http
      .get("/landOwners/getSelectLandowner/" + id)
      .then((res) => res);
    if (data.status === 200) {
      return data;
    } else {
      openNotificationWithIcon("Error", "Error get", "Error");
    }
  }

  //Get Trees by Landowner ID
  async function getTreeSpeciesByRegNo(id) {
    const data = await http
      .get("/landOwners/getTreeSpeciesByID/" + id)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      return data;
    } else {
      openNotificationWithIcon("Error", "Error get", "Error");
    }
  }

  //Get Stage by ExistingBioDiversity
  async function getStageByExistingBioDiversity(id) {
    const data = await http
      .get("/landOwners/getStageByExistingBioDiversity/" + id)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      return data;
    } else {
      openNotificationWithIcon("Erro", "Error get", "Error")
    }
  }


  //Delete Land Owners Data According to the ID
  async function deleteLandOwnerById(Id) {
    const data = await http
      .put("/landOwners/deleteLandowner/" + Id)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Deleted!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Deleting", "Error");
    }
  }


  //Update Land Owners Data According to the ID
  async function updateLandOwnerById(Id, landData) {
    const data = await http
      .put("/landOwners/updateLandowner/" + Id, landData)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Updated!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Updating", "Error");
    }
  }


  //Add new Land owners
  async function addNewLandOwner(landData) {
    const data = await http
      .post("/landOwners/add", landData)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Added!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Adding", "Error");
    }
  }


  //Give The Land owner Approvel
  async function approveLandOwnerById(Id) {
    const data = await http
      .put("/landOwners/approveLandowner/" + Id)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      openNotificationWithIcon("success", "successfully Approved!", "Success");
    } else {
      openNotificationWithIcon("Error", "Error in Approving", "Error");
    }
    // return data;
  }


  //Give The Land owner unApprove
  async function unApproveLandOwnerById(Id) {
    const data = await http
      .put("/landOwners/unApproveLandowner/" + Id)
      .then((res) => res);
    console.log(data.status === 200);
    if (data.status === 200) {
      openNotificationWithIcon(
        "success",
        "successfully Unapproved!",
        "Success"
      );
    } else {
      openNotificationWithIcon("Error", "Error in Unapproving", "Error");
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
    getTreeSpeciesByRegNo,
    getStageByExistingBioDiversity,
  };
}
