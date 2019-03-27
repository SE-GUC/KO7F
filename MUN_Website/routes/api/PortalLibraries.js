const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PortalLibrary = require("../../models/PortalLibrary");
const validator = require("../../validations/PortalLibraryValidations");

//As an Authorized User I should be able to read the PortalLibrary
router.get("/", async (req, res) => {
  const PortalLibraries = await PortalLibrary.find();
  res.json({ data: PortalLibraries });
});

//As an Authorized User I should be able to add to the PortalLibrary
router.post("/", async (req, res) => {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const newPortalLibrary = await PortalLibrary.create(req.body);
    res.json({
      msg: "Portal Library was created successfully",
      data: newPortalLibrary
    });
    res.send(newPortalLibrary);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
