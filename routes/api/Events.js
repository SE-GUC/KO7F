const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Event = require("../../models/Event");
const validator = require("../../validations/EventValidations");

//As an Authorized User and Non Authorized User I should be able to read Events
router.get("/", async (req, res) => {
  const Events = await Event.find();
  res.json({ data: Events });
});

//As an Authorized User I should be able to create Events
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newEvent = await Event.create(req.body);
    res.json({ msg: "Event was created successfully", data: newEvent });
    res.send(newEvent);
  } catch (error) {
    console.log(error);
  }
});

//As an Authorized User I should be able to update Events
router.put("/:id", async (req, res) => {
  try {
    const IsEvent = await Event.findOne(req.param.id);

    if (!IsEvent)
      return res.status(404).send({ error: "Event does not exist" });

    const isValidated = validator.updateValidation(req.body);

    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });

    const updatedEvent = await Event.updateOne(req.body);
    res.json({ msg: "Event updated successfully", data: updatedEvent });
  } catch (error) {
    console.log(error);
  }
});

//As an Authorized User I should be able to delete Events
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEvent = await Event.findByIdAndRemove(id);
    res.json({ msg: "Event was deleted successfully", data: deletedEvent });
  } catch (error) {
    console.log(error);
  }
});

//As an Non Authorized User I should be able to rate Events
router.put("/RateEvent/:id", (req, res) => {
  const isEntered = EventsArr.some(
    Event => Event.event_id === parseInt(req.params.id)
  );
  if (isEntered) {
    const eventUpdated = req.body;
    EventsArr.forEach(Event => {
      if (Event.event_id === parseInt(req.params.id)) {
        Event.rating = eventUpdated.rating ? eventUpdated.rating : Event.rating;
        res.json({ msg: "You have successfully rated the Event", Event });
      }
    });
  } else {
    res.status(404).json({ msg: "Nothing have changed" });
  }
});

module.exports = router;
