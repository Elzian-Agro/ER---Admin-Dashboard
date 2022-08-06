import { useCookies } from "react-cookie";
import axios from "axios";
import { notification} from 'antd';
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

  async function getAllTreeSpecies() {
    const data = await http.get("/species").then((res) => res.data.Result);
    return data;
  }

  async function deleteTreeSpeciesById(Id) {
    const data = await http.put("/species/deleteSpecies/" + Id).then((res) => res);
    console.log(data.status === 200)
      if (data.status === 200) {
        openNotificationWithIcon('success',"successfully Deleted!","Success")
      } else
       {
        openNotificationWithIcon('Error',"Error in Deleting","Error")
      }
  }

  async function updateTreeSpeciesById(Id, treeData) {
    const data = await http.put("/species/updateSpecies/" + Id, treeData).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Updated!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Updating","Error")
    }
    
  }

  async function addNewTreeSpecies(treeData) {
    const data = await http.post("/species/add", treeData).then((res) => res);
    console.log(data.status === 200)
    if (data.status === 200) {
      openNotificationWithIcon('success',"successfully Added!","Success")
    } else
     {
      openNotificationWithIcon('Error',"Error in Adding","Error")
    }
  }



  return {
    getAllTreeSpecies,
    deleteTreeSpeciesById,
    updateTreeSpeciesById,
    addNewTreeSpecies,
  };
}
