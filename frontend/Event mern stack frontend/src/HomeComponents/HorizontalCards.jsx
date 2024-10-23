import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "@/lib/action/action";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isAfter } from "date-fns";

const HorizontalCards = () => {
  const [cookie] = useCookies(["dateToday"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const [eventData, setEventData] = useState([]);
  const { val } = useParams();
  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  useEffect(() => {
    if (data) {
      setEventData(
        data
          .filter((event) => event.city == val)
          .filter((event) => isAfter(event.date, cookie.dateToday))
      );
    }
  }, [data, val, cookie.dateToday]);
  const handleClick = (e) => {
    navigate(`/details/${e.currentTarget.getAttribute("value")}`);
  };
  return (
    <div className="mx-2 my-10 hidden lg:block">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:mx-96 md:grid-cols-2 md:mx-36">
        {eventData && eventData.length ? (
          eventData
            .filter((event, index) => index < 3)
            .map((event, index) => {
              return (
                <div
                  key={index}
                  className="lg:grid lg:grid-cols-3 gap-4 box rounded-lg"
                  onClick={handleClick}
                  value={event.event_name}
                >
                  <img
                    src={event.thumbnail}
                    className="rounded-l-lg lg:col-start-0 lg:col-start-1 h-full"
                  />
                  <div className="col-start-2 col-end-4">
                    <h1 className="text-lg my-2">{event.event_name}</h1>
                    <p className="mb-2 text-sm">{event.date}</p>
                  </div>
                </div>
              );
            })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HorizontalCards;
