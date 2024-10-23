import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getUserOrders } from "@/lib/action/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const DataTable = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order?.data?.data?.data);
  const [cookie, setCookie, removeCookie] = useCookies(["token", "userdata"]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    dispatch(getUserOrders(cookie?.userdata?._id));
  }, [dispatch, cookie?.userdata]);
  if (orderData) {
    console.log("hello");
  }
  useEffect(() => {
    if (orderData) {
      setOrders((prev) => {
        return [
          ...prev,
          {
            orderID: orderData
              .map((order) => {
                return order.orderID;
              })
              .toString(),
            event: orderData
              .map((order) => {
                return order.products.map((prod) => {
                  return prod.event_name;
                });
              })
              .toString(),
            venue: orderData
              .map((order) => {
                return order.products.map((prod) => {
                  return prod.venue;
                });
              })
              .toString(),
            amount: orderData
              .map((order) => {
                return order.products.map((prod) => {
                  let seats = prod.seat.split("_")[0] + "_price";
                  return prod.quantity * prod[seats];
                });
              })
              .toString(),
          },
        ];
      });
    }
  }, [orderData]);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order ID</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Venue</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders && orders.length ? (
          orders.map((order, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{order.orderID}</TableCell>
                <TableCell>{order.event}</TableCell>
                <TableCell>{order.venue}</TableCell>
                <TableCell className="text-right">Rs.{order.amount}</TableCell>
              </TableRow>
            );
          })
        ) : (
          <></>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
