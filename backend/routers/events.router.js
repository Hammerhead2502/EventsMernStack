const express = require("express");
const router = express.Router();
const {
  addEvent,
  getAllEvents,
  deleteEvent,
} = require("../controllers/events.controller");

router.post("/add-event", addEvent);
router.get("/get-events", getAllEvents);
router.delete("/delete-event", deleteEvent);

module.exports = router;
