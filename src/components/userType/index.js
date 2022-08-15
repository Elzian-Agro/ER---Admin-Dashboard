import jwt from "jwt-decode";
import { useCookies } from "react-cookie";

const UserType = () => {
  const [cookies] = useCookies(["token"]);
  const user = !cookies.token ? "" : jwt(cookies.token);
  const admin = Boolean(user.isAdmin);
  return { admin };
};

export default UserType;
