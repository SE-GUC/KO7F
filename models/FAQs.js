const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const FAQsSchema = new Schema({
  reply: {
    type: String,
    required: [true, "content field is required"]
  },
  content: {
    type: String,
   required: [true, "content field is required"]
  }
});

const faqs = mongoose.model("FAQs_DB", FAQsSchema);
module.exports = faqs;
