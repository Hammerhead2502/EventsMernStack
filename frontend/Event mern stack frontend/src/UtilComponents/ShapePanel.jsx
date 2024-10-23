/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "@/lib/action/action";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isAfter } from "date-fns";

const ShapePanel = ({ shape, title }) => {
  const [cookie] = useCookies(["dateToday"]);
  const navigate = useNavigate();
  const [style, setStyle] = useState("");
  const dispatch = useDispatch();
  const { val } = useParams();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    dispatch(getAllEvents());
    if (shape == "circle") {
      setStyle("rounded-full h-max");
    }
  }, [shape, dispatch]);
  useEffect(() => {
    if (title == "artist") {
      if (data) {
        setEventData(
          data
            .filter((event) => isAfter(event.date, cookie.dateToday))
            .filter((event) => event.category == "Music")
            .filter((event) => event.city == val)
            .filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.artist === value.artist)
            )
        );
      }
    }
    if (title == "venue") {
      if (data) {
        setEventData(
          data
            .filter((event) => {
              return isAfter(event.date, cookie.dateToday);
            })
            .filter((event) => event.city == val)
            .filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.venue === value.venue)
            )
        );
      }
    }
    if (title == "category") {
      if (data) {
        setEventData(
          data
            .filter((event) => isAfter(event.date, cookie.dateToday))
            .filter((event) => event.city == val)
            .filter(
              (value, index, self) =>
                index === self.findIndex((t) => t.category === value.category)
            )
        );
      }
    }
  }, [data, val, title, cookie.dateToday]);
  const result = data
    ?.filter((event) => isAfter(event.date, cookie.dateToday))
    ?.filter((event) => event.city == val)
    .reduce((acc, item) => {
      const key = item[title];
      if (!acc.hasOwnProperty(key)) {
        acc[key] = 0;
      }
      acc[key] += 1;
      return acc;
    }, []);
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/events?city=${val}&${title}=${e.target.getAttribute("value")}`);
  };
  return (
    <div className="mx-2 my-10">
      <Carousel className=" mx-14 lg:mx-96">
        <h1 className="mb-4 text-xl">{title.toUpperCase()}</h1>
        <CarouselPrevious className="lg:hidden" />
        <CarouselContent>
          {eventData && eventData.length ? (
            eventData.map((event, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-1/6 overflow-visible"
                >
                  <img
                    src={event.gallery[0]}
                    className={`${style} h-32 w-full`}
                    onClick={handleClick}
                    value={event[title]}
                  />
                  <div className="h-max py-2">
                    <p className="text-center my-0 leading-none text-sm font-bold mb-1">
                      {event[title]}
                    </p>
                    {title != "artist" && (
                      <p className="text-center my-0 leading-none text-xs text-gray-500">
                        {result[event[title]]} event/s
                      </p>
                    )}
                  </div>
                </CarouselItem>
              );
            })
          ) : (
            <></>
          )}
        </CarouselContent>
        <CarouselNext className="lg:hidden" />
      </Carousel>
    </div>
  );
};

export default ShapePanel;
