const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the schema
const PortalLibrarySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title field is required"]
  },
  details: {
    type: String,
    required: [true, "Details field is required"]
  }
});

const portalLibrary = mongoose.model("PortalLibrary_DB", PortalLibrarySchema);
module.exports = portalLibrary;
