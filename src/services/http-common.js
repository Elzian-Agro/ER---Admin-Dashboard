// import axios from "axios";
// import { useCookies } from "react-cookie";
// import Tokenservice from "./token-service";
//  const{getLocalRefreshToken,getLocalAccessToken,updateNewAccessToken}=Tokenservice()

// // let cookie;

// function Cookie() {
//   const [cookie] = useCookies();
//   return cookie;
// }


// export const http = axios.create({
//   baseURL: "http://localhost:4000",
//   headers: {
//     "Content-type": "application/json",
//     "x-auth-token":getLocalAccessToken()
//   },
// });
// http.interceptors.request.use(
//   (config) => {
//     const token = getLocalAccessToken();
//     if (token) {
//       config.headers["x-auth-token"] = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// http.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (err) {
//       // access token expired
//       if (err && !originalConfig._retry) {
//         // handle infinite loop
//         originalConfig._retry = true;
//         try {
//           const rs = await http.post("/admin/getNewAccessToken", {
//             refreshToken: getLocalRefreshToken(),
//           });
//           //console.log("response", rs);
//           const { accessToken } = rs.data;
//           //console.log("NewAccessToken", accessToken);
//           updateNewAccessToken(accessToken);
//           return http(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );