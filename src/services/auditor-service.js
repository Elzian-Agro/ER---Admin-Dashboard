import axios from "axios";

export default function AuditorService() {
  const http = axios.create({
    baseURL:
      "http://ec2-13-250-22-64.ap-southeast-1.compute.amazonaws.com:4000",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ1NTU1NTEzfQ.Kv2cEkCU-F9w_Gd_ajB2zfiUW66G6WPg7dPznedIRC0',
    },
  });

  async function getAuditors() {
    const data = await http.get("/users").then((res) => res.data.Result);
    return data;
  }

  async function getDataForCalculation() {
    const data = await http.get("/auditings/getAuditCalculation").then((res) => res.data.Result);
    return data;
  }
  


  async function updateAuditors(user) {
    const data = await http.put("/users/updateAll/" + user.id,user).then((res) => res);
    console.log(data);
  }

  async function deleteAuditors(Id) {
    const data = await http.put("/users/deleteUser/" + Id,{}).then((res) => res);
    console.log(
      data.status === 200
        ? data.data.message
        : "Oops! something went wrong when deleting Auditors"
    );
  }
  return {
    getAuditors,
    updateAuditors,
    deleteAuditors,
    getDataForCalculation,
  };
}
