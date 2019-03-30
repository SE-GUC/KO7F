const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");

const Question = require("../../models/Question");
const validator = require("../../Validations/QuestionValidations")


//as an authorized or non-authorized i should be able to read questions

router.get("/Question", async (req, res) => {
  const Questions = await Question.find();
  res.json({ data: Questions });
});

// As an Authorized or non-Authorized user i should be able to create questions
router.post("/CreateQuestion", async (req, res) => {
    try {
      const isValidated = validator.createValidation(req.body);
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message });
      const newQuestion = await Question.create(req.body);
      res.json({ msg: "Question was created successfully", data: newQuestion });
      res.send(newQuestion);
    } catch (error) {
      console.log(error);
    }
  });
  

module.exports = router;
