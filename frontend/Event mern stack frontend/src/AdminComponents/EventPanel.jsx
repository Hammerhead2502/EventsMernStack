import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "@/lib/action/action";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from "./Header";
import { motion } from "framer-motion"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const EventPanel = () => {
  const dispatch = useDispatch();
  const [eventID, setEventID] = useState("");
  const data = useSelector((state) => state.event?.data?.data?.data);
  const [galleryData, setGalleryData] = useState([]);
  const [eventData, setEventData] = useState({
    event_name: "",
    description: "",
    category: "",
    date: "",
    artist: "",
    time: "",
    city: "",
    venue: "",
    address: "",
    language: "",
    thumbnail: "",
    gallery: [],
    diamond_price: 1000,
    platinum_price: 800,
    gold_price: 500,
    silver_price: 200,
    diamond_seats: 20,
    platinum_seats: 20,
    gold_seats: 30,
    silver_seats: 50,
    target_audience: "",
    terms: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [delShow, setDelShow] = useState(false);
  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);
  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    setEventData((prev) => {
      return { ...prev, [name]: val };
    });
  };
  const handleGalleryImages = (e) => {
    e.preventDefault();
    const val = document.getElementById("gallery").value;
    const name = document.getElementById("gallery").name;
    setGalleryData((prev) => {
      return [...prev, val];
    });
    setEventData((prev) => {
      return { ...prev, [name]: galleryData };
    });
  };
  const addEvent = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/add-event`, {
        event_name: eventData.event_name,
        description: eventData.description,
        category: eventData.category,
        date: new Date(),
        artist: eventData.artist,
        time: eventData.time,
        city: eventData.city,
        venue: eventData.venue,
        address: eventData.address,
        language: eventData.language,
        thumbnail: eventData.thumbnail,
        gallery: eventData.gallery,
        diamond_price: eventData.diamond_price,
        platinum_price: eventData.platinum_price,
        gold_price: eventData.gold_price,
        silver_price: eventData.silver_price,
        diamond_seats: eventData.diamond_seats,
        platinum_seats: eventData.platinum_price,
        gold_seats: eventData.gold_price,
        silver_seats: eventData.silver_price,
        target_audience: eventData.target_audience,
        terms: eventData.terms,
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setShow(false)
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSelect = (e) => {
    setEventID(e.target.value);
  };
  const deleteEvent = async (e) => {
    e.preventDefault();
    const response = await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/delete-event`, { data: { id: eventID } })
      .then((res) => {
        if (res.status == 200) {
          setDelShow(false)
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);
  return (
    <div className="flex-1 relative z-50 overflow-auto">
      <Header title='Events' />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div className='grid grid-cols-1 gap-5 mb-8'
          initial={{ scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            ease:"easeInOut",
            duration: 0.3
          }}
        >
      <TableContainer component={Paper} className="overflow-auto mt-10">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Event name</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Artist</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length ? data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.event_name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.city}</StyledTableCell>
              <StyledTableCell align="right">{row.artist}</StyledTableCell>
              <StyledTableCell align="right">{row.date.substring(0, 10)}</StyledTableCell>
              <StyledTableCell align="right">{row.time}</StyledTableCell>
            </StyledTableRow>
          )): <></>}
        </TableBody>
      </Table>
    </TableContainer>
    <div className="mx-auto w-max">
    <Button variant="primary" onClick={handleShow} className="w-max mr-1 inline">
        Add Event
      </Button>
      <Button variant="danger" onClick={handleDelShow} className="w-max ml-1 inline">
        Delete Event
      </Button>
      </div>
    </motion.div>
      </main>


          {/* ADD EVENT MODAL */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {[{name: "Event Name", value: "event_name"},{name: "Description", value: "description"},{name: "Category", value: "category"},{name: "Date", value: "date"},{name: "Artist", value: "artist"},{name: "Time", value: "time"},{name: "City", value: "city"},{name: "Venue", value: "venue"},{name: "Address", value: "address"},{name: "Language", value: "language"},{name: "Thumbnail picture", value: "thumbnail"},{name: "Target Audience", value: "target_audience"},{name: "Terms", value: "terms"},{name: "Diamond Seats", value: "diamond_seats", default: 20, type: "number"},{name: "Platinum Seats", value: "platinum_seats", default: 20, type: "number"},{name: "Gold Seats", value: "gold_seats", default: 30, type: "number"},{name: "Silver Seats", value: "silver_seats", default: 50, type: "number"},{name: "Diamond ticket price", value: "diamond_price", default: 1000, type: "number"},{name: "Platinum ticket price", value: "platinum_price", default: 800, type: "number"},{name: "Gold ticket price", value: "gold_price", default: 500, type: "number"},{name: "Silver ticket price", value: "silver_price", default: 200, type: "number"},].map((item, index) => {
          return <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>{item.name}</Form.Label>
              <Form.Control
                type={item.type ? item.type : "text"}
                placeholder={item.default ? `Default value - ${item.default}`: item.name}
                name={item.value}
                id={item.value}
                onChange={handleChange}
              />
          </Form.Group>
        })}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Add Gallery Images</Form.Label>
        <Form.Control
                type="text"
                placeholder="Add gallery images"
                name="gallery"
                id="gallery"
                onChange={handleChange}
              />
              <Button variant="primary" onClick={handleGalleryImages} className="mt-3">
            Add Images
          </Button>
          </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>


      {/* DELETE EVENT MODAL */}


      <Modal show={delShow} onHide={handleDelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <label htmlFor="events">Choose an event :-</label>

      <select
      name="events"
      id="events"
      onChange={handleSelect}
      className="border p-2 mx-2 my-2"
    >
      {data ? (
        data.map((event, ind) => {
          return (
            <option key={ind} value={event._id}>
              {event.event_name}
            </option>
          );
        })
      ) : (
        <></>
      )}
    </select>
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteEvent}>
            Delete Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventPanel;