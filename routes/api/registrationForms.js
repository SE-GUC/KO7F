const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const RegistrationForm = require("../../models/RegistrationForm");

//= =---------------------------------------------------= =//
//= =--- HANDLE RegistrationForm lists
//= =---------------------------------------------------= =//
router
  .route("/reg")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      username: joi
        .string()
        .min(1)
        .required(),
      password: joi
        .string()
        .min(1)
        .required(),
      age: joi.number(),
      major: joi.string().required(),
      isPending: joi.boolean().required(),
      isAccepted: joi.boolean().required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const registrationForm = await new RegistrationForm({
        _id: mongoose.Types.ObjectId(),
        username: request.body.username,
        password: request.body.password,
        age: request.body.age,
        major: request.body.major,
        isPending: request.body.isPending,
        isAccepted: request.body.isAccepted
      }).save();
      return response.json({ data: registrationForm });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new user with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allregistrationForm = await RegistrationForm.find({}).exec();
      return response.json({ data: allregistrationForm });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all forms from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE RegistrationForm detail
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
      const registrationForm = await RegistrationForm.findById(
        request.params.id
      ).exec();
      return response.json({ data: registrationForm });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find an registrationForm given the following id`
      });
    }
  })
  .put((request, response) => {
    RegistrationForm.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update RegistrationForm given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    RegistrationForm.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete RegistrationForm given the following data`
        });
      }
    });
  });

module.exports = router;
