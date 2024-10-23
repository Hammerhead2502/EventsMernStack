import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllEvents } from "@/lib/action/action";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EventDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.event?.data?.data?.data);
  const [eventData, setEventData] = useState([]);
  const { ev } = useParams();

  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  useEffect(() => {
    if (data) {
      setEventData(data.filter((event) => event.event_name == ev));
    }
  }, [data, ev]);
  console.log(eventData);
  return (
    <div className="mx-2 my-10">
      <div className="lg:mx-96">
        <div className="grid lg:grid-cols-3 gap-4">
          {eventData && eventData.length ? (
            eventData.map((event, index) => {
              return (
                <div key={index} className="lg:col-span-2 w-full">
                  <img src={event.thumbnail} className="rounded-lg" />
                  <h1 className="text-2xl my-4 underline">About</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus mollis condimentum lectus. Curabitur et congue urna.
                    Praesent varius sem eget nibh ornare, eget rhoncus ante
                    laoreet. Donec facilisis nulla a vestibulum rutrum. Vivamus
                    at sem ac ex gravida pulvinar eu eu sem. Donec quis faucibus
                    tortor. Cras sed placerat ipsum, non aliquam massa. Nulla
                    volutpat et turpis aliquam accumsan. Pellentesque
                    condimentum lorem eu dui vulputate eleifend. Sed
                    pellentesque sapien turpis, consequat sagittis sem
                    sollicitudin ut.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent eget nunc libero. Praesent in eros sit amet ante
                    lacinia ultrices. Donec pellentesque, ex cursus pharetra
                    rhoncus, felis arcu sagittis felis, vel efficitur massa
                    libero a nunc. Nam varius dignissim ligula, at facilisis ex
                    dignissim nec. Etiam maximus et nunc eget fringilla.
                    Phasellus maximus vehicula turpis in venenatis. Vivamus
                    tempor, leo et aliquam ullamcorper, ante ligula aliquam
                    odio, id luctus mi mauris ut turpis. Nullam ullamcorper non
                    dui a tempor. Etiam pulvinar libero id magna blandit, sed
                    mattis odio sodales. Ut rutrum, urna nec laoreet sodales,
                    sapien neque varius erat, vitae malesuada sapien lectus
                    congue metus. Cras sit amet lacus a mauris commodo
                    efficitur. Mauris quis quam tortor. Nullam ac libero
                    hendrerit, pretium ipsum eget, euismod erat. Donec tempor,
                    mauris sed dignissim rhoncus, lectus mi lacinia justo, id
                    molestie erat metus et metus. Mauris sit amet dapibus erat.
                  </p>
                  <p>
                    Aliquam dignissim neque a mauris tincidunt eleifend. In
                    efficitur purus metus. Phasellus quis justo vitae ex
                    tristique bibendum. Ut aliquam erat sit amet justo finibus
                    tristique. Nullam et feugiat tellus, in viverra mi. Aenean
                    augue sapien, lacinia pulvinar neque vel, bibendum tempor
                    augue. Curabitur sit amet egestas mi. Aenean a purus urna.
                    Quisque a purus vel lacus consequat dapibus sed eu tortor.
                    Vestibulum ultrices dolor ac purus tincidunt, ac sodales
                    dolor rhoncus. Suspendisse nec gravida sapien. Suspendisse
                    imperdiet enim iaculis laoreet eleifend. Fusce vulputate
                    ante vitae rhoncus accumsan. Nulla lectus velit, tincidunt
                    sit amet lacus nec, imperdiet faucibus velit. Curabitur
                    congue egestas est id finibus. Proin at vehicula felis
                  </p>
                  <p>
                    Suspendisse iaculis tincidunt volutpat. In vitae ornare
                    risus. Phasellus sed ultrices turpis, in accumsan dolor.
                    Aenean sed venenatis nisi. In sapien augue, posuere quis
                    fringilla mattis, convallis ut sapien. Nunc posuere semper
                    urna, eget pulvinar orci hendrerit quis. Etiam commodo sed
                    leo et lacinia.
                  </p>
                  <h1 className="text-2xl my-4 underline">
                    Frequently Asked Questions
                  </h1>
                  <p className="my-0 font-bold">
                    Q: Is re-entry into the venue allowed?
                  </p>
                  <p>A: No Re-entry allowed.</p>
                  <p className="my-0 font-bold">
                    Q: Is there an age limit to buy the ticket?
                  </p>
                  <p>A: {event.target_audience} years and above</p>
                  <p className="my-0 font-bold">
                    Q: Is parking available at the venue?
                  </p>
                  <p>A: Limited parking is available on a paid basis.</p>
                  <p className="my-0 font-bold">
                    Q: Will food be available at the venue?
                  </p>
                  <p>
                    A: Yes various varieties of food & refreshments will be
                    available.
                  </p>
                  <h1 className="text-2xl my-4 underline">Gallery</h1>
                  <Carousel>
                    <CarouselPrevious />
                    <CarouselContent>
                      {event?.gallery.map((img, ind) => {
                        return (
                          <CarouselItem
                            className="md:basis-1/2 lg:basis-1/2"
                            key={ind}
                          >
                            <img src={img} className="h-full" />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselNext />
                  </Carousel>
                  <h1 className="text-2xl my-4 underline">Venue</h1>
                  <p>{event.address}</p>
                  <iframe
                    src={`https://maps.google.com/maps?&q="+${event.address}"&output=embed`}
                    className="w-full"
                    height="250"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              );
            })
          ) : (
            <></>
          )}
          <div className="lg:col-start-3 lg:col-end-4">
            {eventData && eventData.length ? (
              eventData.map((event, index) => {
                return (
                  <div key={index}>
                    <div className="events mb-4">
                      <p className="my-0 text-2xl font-bold px-4 pb-2 pt-4">
                        {event.event_name}
                      </p>
                      <p className="my-0 px-10 py-2 text-md">
                        <span className="mr-3">
                          <i className="fa-solid fa-icons"></i>
                        </span>
                        {event.category}
                      </p>
                      <p className="my-0 px-10 py-2 text-md">
                        <span className="mr-3">
                          <i className="fa-regular fa-calendar"></i>
                        </span>
                        {event.date} | {event.time}
                      </p>
                      <p className="my-0 px-10 py-2 text-md">
                        <span className="mr-3">
                          <i className="fa-solid fa-location-dot"></i>
                        </span>
                        {event.venue}
                      </p>
                      <p className="inline my-0 px-10 pb-4 pt-2 text-md">
                        <span className="mr-3">
                          <i className="fa-solid fa-wallet"></i>
                        </span>
                        <span className="text-lg font-bold mr-1">
                          {event.silver_price}
                        </span>{" "}
                        onwards
                      </p>
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/select-seats/${event.event_name}`)
                        }
                        className="mb-2"
                      >
                        Buy now
                      </Button>
                    </div>
                    <div className="events">
                      <p className="my-0 text-2xl font-bold px-4 pb-2 pt-4">
                        Event Guide
                      </p>
                      <hr />
                      <p className="my-0 px-10 text-md text-slate-400">
                        For Age(s)
                      </p>
                      <p className="my-0 px-10 py-2 text-md">
                        {event.target_audience}
                      </p>
                      <p className="my-0 px-10 text-md text-slate-400">
                        Language
                      </p>
                      <p className="my-0 px-10 py-2 text-md">
                        {event.language}
                      </p>
                      <p className="my-0 px-10  text-md text-slate-400">
                        Live Performance
                      </p>
                      <p className="my-0 px-10 pb-4 pt-2 text-md">
                        Enjoy a unique experience
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
