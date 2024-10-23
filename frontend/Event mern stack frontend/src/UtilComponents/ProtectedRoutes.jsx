import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoutes = () => {
  const location = useLocation()
  const [cookie] = useCookies(["userdata", "token"]);
  if (!cookie.token) {
    return <Navigate to="/login" state={{prevUrl : location.pathname}}/>;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
