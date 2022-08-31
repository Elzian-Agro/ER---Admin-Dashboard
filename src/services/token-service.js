
export default function Tokenservice() {
  const getLocalRefreshToken = () => {
    const user = localStorage.getItem("refreshToken");
    return user;
  };
  
  const getLocalAccessToken = () => {
    const user =localStorage.getItem("token");
    return user;
  };
  
  const updateNewAccessToken = (token) => {
    localStorage.setItem("token",token );
  };
  return ({
    getLocalRefreshToken,
    getLocalAccessToken,
    updateNewAccessToken,
})
}


