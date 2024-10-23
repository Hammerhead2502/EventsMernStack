import { useState, useEffect } from "react";
import DrawerComponent from "./DrawerComponent";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/lib/action/action";

const AddToCart = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const eventName = searchParams.get("event");
  const seat = searchParams.get("seat") + "_seats";
  const [eventData, setEventData] = useState([]);
  const [ticketData, setTicketData] = useState({
    title: "",
  });
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      setEventData(data.filter((event) => event.event_name == eventName));
    }
  }, [data, eventName]);
  useEffect(() => {
    if (seat == "diamond_seats") {
      setTicketData((prev) => {
        return { ...prev, title: "Diamond" };
      });
    }
    if (seat == "platinum_seats") {
      setTicketData((prev) => {
        return { ...prev, title: "Platinum" };
      });
    }
    if (seat == "gold_seats") {
      setTicketData((prev) => {
        return { ...prev, title: "Gold" };
      });
    }
    if (seat == "silver_seats") {
      setTicketData((prev) => {
        return { ...prev, title: "Silver" };
      });
    }
  }, [seat]);

  return (
    <div className="mx-2">
      <div className="lg:mx-96 mt-4">
        <h1>Choose Tickets :-</h1>
        <div className="border border-4 border-black mb-4 mt-4">
          <h1 className="p-4 my-0 text-lg">{ticketData.title} - Phase 1</h1>
          <hr className="my-0" />
          <p className="p-4">
            This ticket grants you access to the {ticketData.title} section of
            the show. Please note: This is a free seating event. Seats will be
            available on first-come-first served basis.
          </p>
          {eventData && eventData.length ? (
            eventData.map((event, index) => {
              return (
                <div key={index}>
                  {event[seat] != 0 ? (
                    <DrawerComponent
                      key={index}
                      event={event}
                      seats={seat}
                      remaining={event[seat]}
                    />
                  ) : (
                    <button className="but px-4 py-2 ml-6 mb-4 text-red-700">
                      Sold Out
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
        <div className="border border-4 border-black mb-4">
          <h1 className="p-4 my-0 text-lg">{ticketData.title} - Early Bird</h1>
          <hr className="my-0" />
          <p className="p-4">
            This ticket grants you access to the {ticketData.title} section of
            the show. Please note: This is a free seating event. Seats will be
            available on first-come-first served basis.
          </p>
          {eventData && eventData.length ? (
            eventData.map((event, index) => {
              return (
                <div key={index}>
                  {event[seat] != 0 ? (
                    <DrawerComponent
                      key={index}
                      event={event}
                      seats={seat}
                      remaining={event[seat]}
                    />
                  ) : (
                    <button className="but px-4 py-2 mb-4 ml-6 text-red-700">
                      Sold Out
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
