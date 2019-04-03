const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const user = require("../../models/User");

//= =---------------------------------------------------= =//
//= =--- HANDLE users lists
//= =---------------------------------------------------= =//
router
  .route("/")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      name: joi
        .string()
        .min(3)
        .max(50)
        .required(),
      password: joi
        .string()
        .min(3)
        .required(),
      age: joi
        .number()
        .min(1)
        .max(5),
      major: joi
        .string()
        .min(3)
        .max(50),
      admin : joi
        .boolean()
        .required()


    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const user = await new user({
        _id: mongoose.Types.ObjectId(),
        name: request.body.name,
        password: request.body.password,
        age: request.body.age,
        major: request.body.major,
        admin: request.body.admin
      }).save();
      return response.json({ data: user });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new user with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allUsers = await user.find({}).exec();
      return response.json({ data: allUsers });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all users from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE users detail
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
      const user = await user.findById(request.params.id).exec();
      return response.json({ data: user });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find an user given the following id`
      });
    }
  })
  .put((request, response) => {
    user.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update an user given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    user.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete an user given the following data`
        });
      }
    });
  });



module.exports = router;
