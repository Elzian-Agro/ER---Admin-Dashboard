// import { useCookies } from "react-cookie";
import axios from "axios";

export default function DataService() {
  // const [cookies] = useCookies(["token"]);

  const http = axios.create({
    baseURL:
      "http://ec2-13-229-44-15.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ3MzY4ODg4fQ.2o7M2RV88a7shoCmcEcgS0AXfjXAYrC14KynieCBuvA',
    },
  });


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
