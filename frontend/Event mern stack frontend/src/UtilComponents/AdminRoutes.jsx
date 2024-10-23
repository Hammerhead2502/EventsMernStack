import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoutes = () => {
  const [cookie] = useCookies(["token", "userdata"]);
  const location = useLocation()
  if (!cookie?.userdata) {
    return <Navigate to="/login" state={{prevUrl: location.pathname}}/> 
  }
  else{
    if(cookie?.userdata?.role != "admin"){
      return <Navigate to="/" />;
    }
  }
  return <Outlet />;
};

export default AdminRoutes;
