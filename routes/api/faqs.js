const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const FAQs = require("../../models/faqs");
//= =---------------------------------------------------= =//
//= =--- HANDLE FAQs lists
//= =---------------------------------------------------= =//
router
  .route("/")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      reply: joi
        .string()
        .min(3)
        .max(100)
        .required(),
      content: joi
        .string()
        .min(3)
        .max(200)
        .required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const faqs = await new FAQs({
        _id: mongoose.Types.ObjectId(),
        reply: request.body.reply,
        content: request.body.content
      }).save();
      return response.json({ data: faqs });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new faqs with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allFAQs = await FAQs.find({}).exec();
      return response.json({ data: allFAQs });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all FAQs from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE FAQs detail
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
      const faqs = await FAQs.findById(request.params.id).exec();
      return response.json({ data: faqs });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find an faqs given the following id`
      });
    }
  })
  .put((request, response) => {
    FAQs.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update an faqs given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    FAQs.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete an faqs given the following data`
        });
      }
    });
  });

module.exports = router;
