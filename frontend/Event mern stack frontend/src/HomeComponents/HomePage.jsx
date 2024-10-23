import CarouselSetup from "@/UtilComponents/CarouselSetup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./HorizontalCards";
import ReusableCards from "../UtilComponents/ReusableCards";
import CategoryCards from "./CategoryCards";
import ShapePanel from "../UtilComponents/ShapePanel";
import { useCookies } from "react-cookie";
import DateSpan from "@/UtilComponents/DateSpan";

const HomePage = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["dateToday", "city"]);
  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      await axios(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      ).then((res) => {
        if (res?.status == 200) {
          if (!cookie.city) {
            setCookie("city", res?.data?.address?.city);
            navigate(`/${res?.data?.address?.city}`);
          } else {
            navigate(`/${cookie.city}`);
          }
        }
      });
    });
  };
  useEffect(() => {
    getUserLocation();
  }, []);
  useEffect(() => {
    var todayDate = new Date();
    var dd = String(todayDate.getDate()).padStart(2, "0");
    var mm = String(todayDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = todayDate.getFullYear();
    todayDate = new Date(yyyy + "-" + mm + "-" + dd);
    setCookie("dateToday", todayDate);
  }, [setCookie]);
  var d = new Date("2024-02-29");
  d.setDate(d.getDate() + 1);
  return (
    <div>
      <CarouselSetup />
      <HorizontalCards />
      <DateSpan />
      <CategoryCards />
      <ReusableCards title="Art" icon="fa-brands fa-artstation" />
      <ReusableCards title="Comedy" icon="fa-solid fa-masks-theater" />
      <ReusableCards title="Gathering" icon="fa-solid fa-people-group" />
      <ReusableCards title="Music" icon="fa-solid fa-music" />
      <ShapePanel shape="" title="category" />
      <ShapePanel shape="circle" title="artist" />
      <ShapePanel shape="" title="venue" />
    </div>
  );
};

export default HomePage;
