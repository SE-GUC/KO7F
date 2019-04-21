const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ContactUs = require("../../models/ContactUs");

//= =---------------------------------------------------= =//
//= =--- HANDLE contact form lists
//= =---------------------------------------------------= =//
router
  .route("/")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      fname: joi.string().required(),
      lname: joi.string().required(),
      email: joi.string().required(),
      message: joi.string().required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const contact_us = await new ContactUs({
        _id: mongoose.Types.ObjectId(),
        fname: request.body.fname,
        lname: request.body.lname,
        email: request.body.email,
        message: request.body.message
      }).save();
      return response.json({ data: contact_us });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new contact form with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allcontactUs = await ContactUs.find({}).exec();
      return response.json({ data: allcontactUs });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all contact forms from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE contact form detail
//= =---------------------------------------------------= =//
router
  .route("/:id")
  .all(async (request, response, next) => {
    const status = joi.validate(request.params, {
      id: joi
        .string()
        .length(24)
        .required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    next();
  })
  .get(async (request, response) => {
    try {
      const contactUs = await ContactUs.findById(request.params.id).exec();
      return response.json({ data: contactUs });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find the contact form given the following id`
      });
    }
  })
  .put((request, response) => {
    ContactUs.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update the contact form given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    ContactUs.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete the contact form given the following data`
        });
      }
    });
  });

module.exports = router;
