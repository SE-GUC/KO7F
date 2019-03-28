const express = require("express");
const Joi = require("joi");
const uuid = require("uuid");
const router = express.Router();

const Question = require("../../models/Question");

const QuestionArr = [
  new Question("What", 30, "omar"),
  new Question("Why", 27, "folan"),
  new Question("When", 29, "jack")
];

//as an authorized or non-authorized i should be able to read questions

router.get("/Question", (req, res) => res.json({ data: QuestionArr }));

// As an Authorized or non-Authorized user i should be able to create questions
router.post("/CreateQuestion", (req, res) => {
  const quest = req.body.quest;
  const question_id = req.body.question_id;
  const submit_user = req.body.submit_user;

  if (!quest) return res.status(400).send({ err: "question is required" });
  if (!question_id || typeof question_id !== "number")
    return res.status(400).send({ err: "id is required" });
  if (!submit_user)
    return res.status(400).send({ err: "Invalid value for id" });

  const newQuestion = {
    quest: quest,
    question_id: question_id,
    submit_user: submit_user
  };
  QuestionArr.push(newQuestion);
  res.send(QuestionArr);
});

module.exports = router;
