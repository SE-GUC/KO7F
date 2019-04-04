const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const Userschema = new Schema({
  name: {
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
  major:{
      type: String,
      required:false
  },
  admin:{
        type: Boolean,
        required: true
  }
});

const user = mongoose.model("User_DB", Userschema);
module.exports = user;
