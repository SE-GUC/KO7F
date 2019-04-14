
const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Question = require("../../models/Question");

//= =---------------------------------------------------= =//
//= =--- HANDLE question lists
//= =---------------------------------------------------= =//
router
  .route("/")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      quest: joi
        .string()
        .min(10)
        .max(1000)
        .required(),
      question_id: joi
        .number()
        .min(3)
        .required(),
      submit_user: joi
        .string()
        .min(3)
        .max(50)
        .required(),
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const question = await new Question({
        _id: mongoose.Types.ObjectId(),
        quest: request.body.quest,
        question_id: request.body.question_id,
        submit_user: request.body.submit_user
      }).save();
      return response.json({ data: question });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new question with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allQuestions = await Question.find({}).exec();
      return response.json({ data: allQuestions });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all questions from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE question detail
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
      const question = await Question.findById(request.params.id).exec();
      return response.json({ data: question });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find a question given the following id`
      });
    }
  })
  .put((request, response) => {
    Question.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update a question given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    Question.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete a question given the following data`
        });
      }
    });
  });


module.exports = router;