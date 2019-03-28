// The Question Model
class Question {
  constructor(quest, question_id, submit_user) {
    this.quest = quest;
    this.question_id = question_id;
    this.submit_user = submit_user;
  }
}

module.exports = Question;
