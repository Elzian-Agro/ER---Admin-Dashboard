import {useContext} from 'react'
import {LoginContext} from "../components/helper/Context"
 
export default function Tokenservice() {
const {setAccessTokenMemory ,accessTokenMemory}= useContext(LoginContext);
  const getLocalRefreshToken = () => {
    const user = localStorage.getItem("refreshToken");
    return user;
  };
  
  const getLocalAccessToken = () => {
    const user =localStorage.getItem("token");
    return user;
  };
  
  const updateNewAccessToken = (token) => {;
    localStorage.setItem("token",token );
  };
  return ({
    getLocalRefreshToken,
    getLocalAccessToken,
    updateNewAccessToken,
})
}


// const getLocalRefreshToken = () => {
//     const user = localStorage.getItem("refreshToken");
//     return user;
//   };
  
//   const getLocalAccessToken = () => {
//     const user =localStorage.getItem("token");
//     return user;
//   };
  
//   const updateNewAccessToken = (token) => {;
//     localStorage.setItem("token",token );
//   };
  
//   const TokenService = {
//     getLocalRefreshToken,
//     getLocalAccessToken,
//     updateNewAccessToken,
//   };
  
//   export default TokenService;