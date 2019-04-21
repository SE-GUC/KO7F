const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const ContactUsSchema = new Schema({
  fname: {
    type: String,
    required: [true, "First name is required"]
  },
  lname: {
    type: String,
    required: [true, "Last name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  message: {
    type: String,
    required: [true, "Message is required"]
  }
});

const contactUs = mongoose.model("ContactUs_DB", ContactUsSchema);
module.exports = contactUs;
