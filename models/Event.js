const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const EventSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  details: {
    type: String,
    required: [true, "Details field is required"]
  },
  rating: {
    type: Number,
    required: false
  },
  event_date: {
    type: Date,
    required: [true, "Date field is required"]
  }
});

const event = mongoose.model("Event_DB", EventSchema);
module.exports = event;
