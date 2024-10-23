import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { getAllEvents } from "@/lib/action/action";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies(["city", "dateToday"]);
  const data = useSelector((state) =>
    state.event?.data?.data?.data
      .filter((event) => event.city == cookie.city)
      .filter(
        (event) =>
          new Date(event.date).toDateString() >=
          new Date(cookie.dateToday).toDateString()
      )
  );
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  const handleClick = (e) => {
    setCookie("city", e.target.innerHTML);
    window.location.reload();
  };

  return (
    <div className="m-0 sticky">
      <div className="bg-gray-200 m-0">
        <div className="md:mx-96 py-4">
          <h1 className="text-sm">
            Curated & Handpicked Events in {cookie.city}
          </h1>
          <p className="text-xs">
            MDsider aims to give you experiences in Mumbai worth your time and
            money, and hopefully, encourage you to try something new. Be it
            curing post-work blues or making your weekend (more) awesome, you'll
            find it here. Explore live events (music, comedy, theater, art);
            dining experiences; weekend getaways (treks, adventure, tours,
            travel, cycling, amusement parks); and live sport (cricket,
            football, kabaddi, badminton) matches; workshops (photography,
            marketing, cooking, baking, painting) and more.
          </p>
          {data && data.length ? (
            data.map((event, index) => {
              return (
                <span
                  key={index}
                  className="bg-white mr-2 px-2 py-1 text-xs rounded-md cursor-default"
                  onClick={() => navigate(`/details/${event.event_name}`)}
                >
                  {event.event_name}
                </span>
              );
            })
          ) : (
            <></>
          )}
          <hr />
          <h1 className="text-sm mt-4">
            Music Events: Gigs & Festivals in {cookie.city}
          </h1>
          <p className="text-xs">
            Calling all music lovers! Watch Arijit Singh, AR Rahman, Shreya
            Ghoshal, Darshan Raval, Harrdy Sandhu, Anuv Jain, Pradeep Kumar,
            Vidyasagar, Sonu Nigam, Ilaiyaraaja, Yuvan Shankar Raja, Fossils,
            Ritviz, Vijay Antony, When Chai Met Toast, Harris Jayaraj, Lucky
            Ali, UB40, Ronan Keating, Snarky Puppy, 50 Cent, Asha Bhosle,
            Karthik, Vijay Antony, Diljit Dosanjh, Shaan, Sunidhi Chauhan, Sid
            Sriram and Kerala Dust, live - at festivals, club shows, gigs or
            concerts. Paytm Insider has the best curated music events, across
            genres: rock, metal, EDM, pop, fusion, hip-hop, jazz, classical,
            Bollywood and world, at some of the best live music venues in the
            country. Paytm Insider hosts several top properties, including NH7
            Weekender, Horn Ok Please, Grub Fest, Casa Bacardi, Independence
            Rock, Toast- Wine & Beer Festival, Dream Hack, Beat Street, Great
            Indian Sneaker Fest, Echoes of Earth, Bollywood Music Project, Under
            25 Summit, Indiegaga, India Cocktail Week, Gin Explorers Club, Lil
            Flea, Dreamhack, HT City Unwind, Van Gogh, The Vault, Steppinout,
            Sunday Soul Sante, South Side Story, Black Dog Easy Evenings and
            YouTube Fanfest.
          </p>
          {data && data.length ? (
            data
              .filter((event) => event.category == "Music")
              .map((event, index) => {
                return (
                  <span
                    key={index}
                    className="bg-white mr-2 px-2 py-1 text-xs rounded-md cursor-default"
                    onClick={() => navigate(`/details/${event.event_name}`)}
                  >
                    {event.event_name}
                  </span>
                );
              })
          ) : (
            <></>
          )}
          <hr />
          <h1 className="text-sm mt-4">
            Comedy shows: Standup & Open Mic in {cookie.city}
          </h1>
          <p className="text-xs">
            Who doesn't enjoy a good laugh? You'll find the latest shows by the
            best Indian comedians - Zakir Khan, Kapil Sharma, Kanan Gill, Biswa
            Kalyan Rath, Akash Gupta, Anubhav Singh Bassi, Alexander Babu, Harsh
            Gujral, Sahil Shah, Rahul Subramanian, Kenny Sebastian, Aakash Gupta
            and Comicstaan finalists like Nishant Suri, Rahul Dua & others and
            more, on Paytm Insider. Catch them doing tours of their specials,
            trying new material, hosting an open mic, and more. Catch the big
            names of comedy at Headliners and LOLStars; or shows to see
            up-and-coming comics enthrall audiences, and open mic events where
            you'll see and cheer on fresh talent! International legends like
            Daniel Sloss, Jimmy Carr, Russel Peters, Eddie Izzard & Bill Burr
            have ticketed here in the past.
          </p>
          {data && data.length ? (
            data
              .filter((event) => event.category == "Comedy")
              .map((event, index) => {
                return (
                  <span
                    key={index}
                    className="bg-white mr-2 px-2 py-1 text-xs rounded-md cursor-default"
                    onClick={() => navigate(`/details/${event.event_name}`)}
                  >
                    {event.event_name}
                  </span>
                );
              })
          ) : (
            <></>
          )}
          <hr />
          <h1 className="text-sm mt-4">Art in {cookie.city}</h1>
          <p className="text-xs">Get tickets to Art in {cookie.city}:</p>
          {data && data.length ? (
            data
              .filter((event) => event.category == "Art")
              .map((event, index) => {
                return (
                  <span
                    key={index}
                    className="bg-white mr-2 px-2 py-1 text-xs rounded-md cursor-default"
                    onClick={() => navigate(`/details/${event.event_name}`)}
                  >
                    {event.event_name}
                  </span>
                );
              })
          ) : (
            <></>
          )}
          <hr />
          <h1 className="text-lg">EXPLORE EVENTS IN TRENDING CITIES</h1>
          {["Mumbai", "Delhi", "Pune"].map((city, index) => {
            return (
              <span
                key={index}
                className="bg-white mr-2 px-2 py-2 text-sm rounded-md cursor-default"
                onClick={handleClick}
              >
                {city}
              </span>
            );
          })}
        </div>
      </div>
      <div className="bg-[#152238]">
        <div className="md:mx-96 py-4">
          <h1 className="text-white text-2xl">MDsider</h1>
          <p className="text-white text-sm">
            MDsider is a platform that helps you discover and buy the best in
            events, travel and food in your city. We strive to curate
            experiences that are worth your time and money, possibly something
            you have never tried before.
          </p>
          <h1 className="text-white text-lg font-bold tracking-tighter">
            FOR EVENT ORGANIZERS
          </h1>
          <p className="text-white text-sm">
            MDsider is built by the same team that created Bacardi NH7 Weekender
            (us) and we sure know what goes into putting together a great
            experience. Our technology, marketing and customer support can help
            you build a community of not just ticket buyers, but also fans.
          </p>
          <span
            className="text-white mr-2 text-lg font-bold tracking-tighter cursor-default"
            onClick={() => navigate(`/${cookie.city}`)}
          >
            Home
          </span>
          <span
            className="text-white mr-2 text-lg font-bold tracking-tighter cursor-default"
            onClick={() => navigate("/")}
          >
            About Us
          </span>
          <span
            className="text-white mr-2 text-lg font-bold tracking-tighter cursor-default"
            onClick={() => navigate("/")}
          >
            Contact Us
          </span>
          <div className="mt-2">
            <span className="text-white mr-4">Find us on:-</span>
            <span>
              <i
                className="fa-brands fa-instagram text-white text-3xl mr-6"
                onClick={() => navigate("www.instagram.com")}
              ></i>
            </span>
            <span>
              <i
                className="fa-brands fa-facebook text-white text-3xl mr-6"
                onClick={() => navigate("www.facebook.com")}
              ></i>
            </span>
            <span>
              <i
                className="fa-brands fa-x-twitter text-white text-3xl mr-6"
                onClick={() => navigate("www.twitter.com")}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
