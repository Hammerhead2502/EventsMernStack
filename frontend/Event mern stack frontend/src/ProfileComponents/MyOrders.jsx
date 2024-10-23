import { getUserOrders } from "@/lib/action/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import DataTable from "./DataTable"; 

const MyOrders = () => {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "userdata",
    "dateToday",
  ]);
  useEffect(() => {
    dispatch(getUserOrders(cookie?.userdata?._id));
  }, [dispatch, cookie?.userdata]);
  
  return (
    <div className="mx-2 my-10">
      <DataTable />
    </div>
  );
};

export default MyOrders;
