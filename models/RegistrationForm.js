const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const RegistrationFormSchema = new Schema({
  username: {
    type: String,
    required: [true, "Name field is required"]
  },
  password: {
    type: String,
    required: [true, "Details field is required"]
  },
  age: {
    type: Number,
    required: false
  },
  major: {
    type: String,
    required: false
  },
  isPending: {
    type: Boolean,
    required: true
  },
  isAccepted: {
    type: Boolean,
    required: true
  }
});

const registrationForm = mongoose.model(
  "RegistrationForm_DB",
  RegistrationFormSchema
);
module.exports = registrationForm;
