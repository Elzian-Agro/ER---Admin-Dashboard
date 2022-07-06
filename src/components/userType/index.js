import jwt from "jwt-decode";
import { useCookies } from "react-cookie";

const UserType = () => {
  const [cookies] = useCookies(["token"]);
  const user = jwt(cookies.token);
  const admin = user.isAdmin;
  return { admin };
};

export default UserType;
