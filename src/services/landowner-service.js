import { useCookies } from "react-cookie";
import axios from "axios";
import { notification} from 'antd';
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
  const [cookies] = useCookies(["token"]);

  const http = axios.create({
    baseURL:
      "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": cookies.token,
    },
  });

  async function getLandOwners() {
    const data = await http.get("/landOwners").then((res) => res.data.Result);
    return data;
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
    // return data;
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
    // return data;
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
    // return data;
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
    deleteLandOwnerById,
    updateLandOwnerById,
    addNewLandOwner,
    approveLandOwnerById,
    unApproveLandOwnerById,
  };
}
