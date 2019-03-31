const nfetch = require("node-fetch");
const AbstractTests = require("./scenarios/AbstractTests");
const Question = require("../../models/Question");

class QuestionsTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id:null,
      quest: null,
      question_id: null,
      submit_user: null
      };
  }
  runIndependently() {
    super.runIndependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure independent questions routes work", () => {
          this.postRequestIndependently();
          this.getRequestIndependently();
          this.putRequestIndependently();
          this.deleteRequestIndependently();
        });
        resolve();
      });
    } catch (err) {}
  }
  runDependently() {
    super.runDependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure dependent questions routes work", () => {
          this.postRequestDependently();
          this.getRequestDependently();
          this.putRequestDependently();
          this.deleteRequestDependently();
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequestIndependently() {
    const requestBody = {
      quest: "What is the university's mission",
      question_id: 600,
      submit_user: "omar"
    };

     test(`Randomly creating a new question,\t\t[=> POST\t${
      this.base_url
    }\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      // go check in the mongo database
      const question = await Question.findOne(requestBody).exec();
      expect(question).toMatchObject(requestBody);
      this.sharedState.id = question._id;
      this.sharedState.quest = question.quest;
      this.sharedState.question_id = question.question_id;
      this.sharedState.submit_user = question.submit_user;
    });
  }
  getRequestIndependently() {
    test(`Fetching the data of that random question,\t[=> GET\t\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      expect(jsonResponse.data.quest).toEqual(this.sharedState.quest);
      expect(jsonResponse.data.question_id).toEqual(this.sharedState.question_id);
      expect(jsonResponse.data.submit_user).toEqual(this.sharedState.submit_user);
    });
  }
  putRequestIndependently() {
    const requestBody = {
      quest: "what is the university's goal",
      question_id: 200,
      submit_user:"ma7maden"
    };
    test(`Updating the data of that random question,\t[=> PUT\t\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "PUT",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      const question = await Question.findOne(requestBody).exec();
      expect(jsonResponse.data.quest).toEqual(question.quest);
      expect(jsonResponse.data.question_id).toEqual(question.question_id);
      expect(jsonResponse.data.submit_user).toEqual(question.submit_user);
      this.sharedState.id = question._id;
      this.sharedState.quest = question.quest;
      this.sharedState.question_id = question.question_id;
      this.sharedState.submit_user = question.submit_user;
    });
  }
  deleteRequestIndependently() {
    test(`Deleting that random quest,\t\t\t[=> DELETE\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      const checkQuestion = await Question.findOne({
        _id: this.sharedState.id
      }).exec();
      expect(checkQuestion).toEqual(null);
    });
  }

  postRequestDependently() {}

  getRequestDependently() {}

  putRequestDependently() {}

  deleteRequestDependently() {}
}

module.exports = QuestionsTest;