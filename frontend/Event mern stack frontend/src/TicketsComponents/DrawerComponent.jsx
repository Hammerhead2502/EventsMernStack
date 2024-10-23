/* eslint-disable react/prop-types */
import * as React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

export default function AnchorTemporaryDrawer({ event, seats, remaining }) {
  const [cookie, setCookie, removeCookie] = useCookies(["token", "userdata"]);
  const location = useLocation()
  console.log(location)
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [ticketCount, setTicketCount] = useState(0);
  const [price, setPrice] = useState(null);
  const handleCount = (e) => {
    const val = e.target.getAttribute("value");
    if (val == "increment") {
      if (ticketCount < remaining) {
        setTicketCount((prev) => prev + 1);
      }
    }
    if (val == "decrement") {
      if (ticketCount > 0) {
        setTicketCount((prev) => prev - 1);
      }
    }
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = (e) => {
    setIsOpen((prevState) => !prevState);
  };
  const addToCart = async (e) => {
    e.preventDefault();
    if (!cookie.token && !cookie.userdata) {
      navigate("/login", {state:{prevUrl: location.pathname+location.search}});
    } else {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/add-to-cart`, {
          eventID: event._id,
          userID: cookie.userdata?._id,
          price: event[price],
          quantity: ticketCount,
          seating: seats,
        })
        .then((res) => {
          if (res.status == 200) {
            navigate("/place-order");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    if (seats) {
      if (seats == "diamond_seats") {
        setPrice("diamond_price");
      }
      if (seats == "platinum_seats") {
        setPrice("platinum_price");
      }
      if (seats == "gold_seats") {
        setPrice("gold_price");
      }
      if (seats == "silver_seats") {
        setPrice("silver_price");
      }
    }
  }, [seats]);
  return (
    <div className="px-4 mb-4 w-full">
      <button onClick={toggleDrawer} className="text-green-700 but px-4 py-2">
        Show
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="text-center"
      >
        <div className="mx-auto">
          <button
            onClick={handleCount}
            value="increment"
            className="my-4 text-2xl"
          >
            +
          </button>
          <p className="my-0 text-3xl">{ticketCount}</p>
          <button
            onClick={handleCount}
            value="decrement"
            className="my-4 text-2xl"
          >
            -
          </button>
          <button
            className="bg-red-700 text-white px-4 py-2 block mx-auto"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </Drawer>
    </div>
  );
}
