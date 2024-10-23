import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/lib/action/action";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { isAfter } from "date-fns";

const Events = () => {
  const [cookie] = useCookies(["dateToday", "city"]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const city = searchParams.get("city");
  const category = searchParams.get("category");
  const artist = searchParams.get("artist");
  const venue = searchParams.get("venue");
  const date = searchParams.get("date");
  const dispatch = useDispatch();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const [eventData, setEventData] = useState([]);
  const [topic, setTopic] = useState({
    topic: "",
    value: "",
  });
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  useEffect(() => {
    if (category) {
      setTopic((prev) => {
        return { ...prev, topic: "category", value: category };
      });
      if (data) {
        setEventData(
          data
            .filter((event) => event[topic.topic] == topic.value)
            .filter((event) => event.city == cookie.city)
            .filter((event) => isAfter(event.date, cookie.dateToday))
        );
      }
    }
    if (artist) {
      setTopic((prev) => {
        return { ...prev, topic: "artist", value: artist };
      });
      if (data) {
        setEventData(
          data
            .filter((event) => event[topic.topic] == topic.value)
            .filter((event) => event.city == cookie.city)
            .filter((event) => isAfter(event.date, cookie.dateToday))
        );
      }
    }
    if (venue) {
      setTopic((prev) => {
        return { ...prev, topic: "venue", value: venue };
      });
      if (data) {
        setEventData(
          data
            .filter((event) => event[topic.topic] == topic.value)
            .filter((event) => event.city == cookie.city)
            .filter((event) => isAfter(event.date, cookie.dateToday))
        );
      }
    }
    if (date) {
      setTopic((prev) => {
        return { ...prev, topic: "date", value: new Date(date).toDateString() };
      });
      if (data) {
        setEventData(
          data
            .filter((event) => {
              return new Date(event[topic.topic]).toDateString() == topic.value;
            })
            .filter((event) => event.city == cookie.city)
            .filter((event) => {
              return event.time >= new Date().toTimeString();
            })
        );
      }
    }
  }, [
    artist,
    category,
    data,
    venue,
    topic.topic,
    topic.value,
    cookie.dateToday,
    date,
  ]);
  const handleClick = (e) => {
    navigate(`/details/${e.target.value}`);
  };
  useEffect(() => {
    if (data) {
      const result = data
        ?.filter((event) => isAfter(event.date, cookie.dateToday))
        .filter((event) => event.city == cookie.city)
        .reduce((acc, item) => {
          const key = item[topic.topic];
          if (!acc.hasOwnProperty(key)) {
            acc[key] = 0;
          }
          acc[key] += 1;
          return acc;
        }, []);
      setNumbers(result);
    }
  }, [data, cookie.dateToday, topic.topic]);

  return (
    <div className="mx-2 my-10">
      <h1 className="md:mx-96 mt-4">
        All events {topic.value}({eventData.length})
      </h1>
      {topic.topic == "date" ? (
        <div className="mx-2 my-10">
          <Carousel className=" mx-14 lg:mx-96">
            {eventData.length && topic.topic == "date" ? (
              <CarouselPrevious />
            ) : (
              <></>
            )}
            <CarouselContent>
              {eventData && eventData.length ? (
                eventData.map((event, index) => {
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
                            className="block"
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
                <h1 className="ml-4 text-lg">
                  {topic.topic == "date" && <span>No events available</span>}
                </h1>
              )}
            </CarouselContent>
            {eventData.length && topic.topic == "date" ? (
              <CarouselNext />
            ) : (
              <></>
            )}
          </Carousel>
        </div>
      ) : (
        <div className="md:mx-96 my-4">
          <p className="inline text-lg font-bold">Select {topic.topic} : - </p>
          {data &&
            data
              .filter(
                (value, index, self) =>
                  index ===
                  self.findIndex((t) => t[topic.topic] === value[topic.topic])
              )
              .filter((event) => event.city == cookie.city)
              .map((event, index) => {
                return (
                  <button
                    key={index}
                    className="mx-2 border p-2 my-2"
                    value={event[topic.topic]}
                    onClick={(e) =>
                      navigate(
                        `/events?city=${city}&${topic.topic}=${e.target.value}`
                      )
                    }
                  >
                    {event[topic.topic]}(
                    {numbers[event[topic.topic]] > 0
                      ? numbers[event[topic.topic]]
                      : 0}
                    )
                  </button>
                );
              })}
        </div>
      )}

      <Carousel className=" mx-14 lg:mx-96">
        {eventData.length && topic.topic != "date" ? (
          <CarouselPrevious />
        ) : (
          <></>
        )}
        <CarouselContent>
          {eventData && eventData.length ? (
            eventData
              .filter((event) => event[topic.topic] == topic.value)
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
                          className="block"
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
            <h1 className="ml-4 text-lg">
              {topic.topic != "date" && <span>No events available</span>}
            </h1>
          )}
        </CarouselContent>
        {eventData.length && topic.topic != "date" ? <CarouselNext /> : <></>}
      </Carousel>
    </div>
  );
};

export default Events;
