import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/lib/action/action";

const SeatPicker = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const navigate = useNavigate();
  const { ev } = useParams();
  const handleNavigate = (e) => {
    navigate(
      `/add-to-cart/?event=${ev}&seat=${e.currentTarget.getAttribute("value")}`
    );
  };
  const [eventData, setEventData] = useState([]);
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      setEventData(data.filter((event) => event.event_name == ev));
    }
  }, [data, ev]);
  
  return (
    <div className="my-10">
      <div className="lg:mx-96">
        <h1 className="w-full py-4 text-center border border-4 border-black bg-[#FFF7E9]">
          Stage
        </h1>
      </div>
      <div
        className="lg:mx-96 bg-[#EE4540]"
        onClick={handleNavigate}
        value="diamond"
      >
        <h1 className="w-full py-8 text-center text-white">
          Ground Floor - Diamond (Rows A to F) Rs.{eventData[0]?.diamond_price}
        </h1>
      </div>
      <div
        className="lg:mx-96 bg-[#C72C41]"
        onClick={handleNavigate}
        value="platinum"
      >
        <h1 className="w-full py-8 text-center text-white">
          Ground Floor - Platinum (Rows G to K) Rs.
          {eventData[0]?.platinum_price}
        </h1>
      </div>
      <div
        className="lg:mx-96 bg-[#801336]"
        onClick={handleNavigate}
        value="gold"
      >
        <h1 className="w-full py-8 text-center text-white">
          Ground Floor - Gold (Rows L to F) Rs.{eventData[0]?.gold_price}
        </h1>
      </div>
      <div
        className="lg:mx-96 bg-[#2D132C]"
        onClick={handleNavigate}
        value="silver"
      >
        <h1 className="w-full py-8 text-center text-white">
          First Floor - Silver (Rows Q to V) Rs.{eventData[0]?.silver_price}
        </h1>
      </div>
    </div>
  );
};

export default SeatPicker;
