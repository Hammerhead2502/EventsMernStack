/* eslint-disable react/prop-types */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "@/lib/action/action";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isAfter } from "date-fns";

const TrendingCards = ({ title, icon }) => {
  const [cookie] = useCookies(["dateToday", "city"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const [eventData, setEventData] = useState([]);
  const [category, setCategory] = useState("");
  const { val } = useParams();
  useEffect(() => {
    dispatch(getAllEvents());
    setCategory(title);
  }, [title, dispatch]);
  useEffect(() => {
    if (data) {
      setEventData(
        data
          .filter((event) => event.city == cookie.city)
          .filter((event) => {
            return isAfter(event.date, cookie.dateToday);
          })
      );
    }
  }, [data, val, cookie.dateToday]);
  const handleClick = (e) => {
    navigate(`/details/${e.target.value}`);
  };
  return (
    <div className="mx-2 my-10">
      <Carousel className=" mx-14 lg:mx-96">
        <h1 className="mb-4 text-xl">
          <i className={`${icon} mr-2`}></i>
          {category.toUpperCase()}
        </h1>
        <CarouselPrevious />
        <CarouselContent>
          {eventData && eventData.length ? (
            eventData
              .filter((event) => event.category == category)
              .map((event, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card>
                      <CardHeader>
                        <img src={event.thumbnail} />
                        <CardTitle className="mt-4">
                          Title - {event.event_name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Time - <span>{event.date}</span> at
                          <span> {event.time}</span>
                        </p>
                        <p className="block">Venue - {event.venue}</p>
                        <Button
                          variant="outline"
                          className="block hover:bg-black"
                          onClick={handleClick}
                          value={event.event_name}
                        >
                          Event Details
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })
          ) : (
            <></>
          )}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default TrendingCards;
