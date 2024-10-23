import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSpan = () => {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const [cookie] = useCookies(["dateToday", "city"]);
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/events?city=${cookie.city}&date=${e.target.value}`);
  };
  const pickedDate = () => {
    console.log(startDate);
    navigate(`/events?city=${cookie.city}&date=${startDate}`);
  };

  useEffect(() => {}, [startDate, setStartDate]);
  return (
    <div className="mx-2 h-max">
      <div className="lg:mx-96 h-max">
        <button
          value={moment().endOf("day")._d.toDateString()}
          onClick={handleClick}
          className=" p-4 text-red-700 mr-4 box h-full"
        >
          Today's events
        </button>

        <button
          value={moment().add(1, "days").endOf("day")._d.toDateString()}
          onClick={handleClick}
          className="box p-4 text-red-700 mr-4 h-full"
        >
          Tomorrow's events
        </button>
        <button
          value={moment().add(2, "days").endOf("day")._d.toDateString()}
          className="box p-3 text-red-700 mr-4 h-full relative bottom-0.5"
        >
          <Dropdown>
            <Dropdown.Toggle variant="none">
              <span className="text-red-700">Upcoming events</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                href="#/action-1"
                onClick={(e) => e.stopPropagation()}
              >
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="mr-2"
                />
                <button
                  onClick={() =>
                    navigate(`/events?city=${cookie.city}&date=${startDate}`)
                  }
                  className="border py-1 px-2 text-green-700"
                >
                  Go
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </button>
      </div>
    </div>
  );
};

export default DateSpan;
