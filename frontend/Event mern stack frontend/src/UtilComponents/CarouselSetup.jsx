import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/lib/action/action";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { isAfter } from "date-fns";
import { useNavigate } from "react-router-dom";

const CarouselSetup = () => {
  const [cookie] = useCookies(["dateToday", "city"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eventData = useSelector((state) =>
    state.event?.data?.data?.data
      ?.filter((event) => isAfter(event.date, cookie.dateToday))
      .filter((event) => event.city == cookie?.city)
  );
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  const handleClick = (e) => {
    navigate(`/details/${e.currentTarget.getAttribute("value")}`);
  };
  return (
    <div className="bg-transparent">
      <Carousel className="mx-14">
        <CarouselPrevious />
        <CarouselContent>
          {eventData && eventData.length ? (
            eventData.map((event, index) => {
              return (
                <CarouselItem
                  className="md:basis-1/2 lg:basis-1/3"
                  key={index}
                  onClick={handleClick}
                  value={event.event_name}
                >
                  <img src={event.thumbnail} className="h-full" />
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

export default CarouselSetup;
