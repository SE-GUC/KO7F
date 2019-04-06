const nfetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const FAQ = require("../../models/FAQs");

class FAQsTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id: null,
      reply: null,
      content: null
    };
  }

  runIndependently() {
    super.runIndependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure independent faqs routes work", () => {
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
        describe("Making sure dependent faqs routes work", () => {
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
      reply: "hello",
      content: "where?"
    };

    test(`Randomly creating a new faq,\t\t[=> POST\t${
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
      const faqs = await FAQ.findOne(requestBody).exec();
      expect(faqs).toMatchObject(requestBody);
      this.sharedState.id = faqs._id;
      this.sharedState.reply = faqs.reply;
      this.sharedState.content = faqs.content;
    });
  }

  getRequestIndependently() {
    test(`Fetching the data of that random faq,\t[=> GET\t\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      expect(jsonResponse.data.reply).toEqual(this.sharedState.reply);
      expect(jsonResponse.data.content).toEqual(this.sharedState.content);
    });
  }

  putRequestIndependently() {
    const requestBody = {
      reply: "Sa7el",
      content: "from 12-5-2020 to 20-5-2020"
    };
    test(`Updating the data of that random faq,\t[=> PUT\t\t${
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

      const faqs = await FAQ.findOne(requestBody).exec();
      expect(jsonResponse.data.reply).toEqual(faqs.reply);
      expect(jsonResponse.data.content).toEqual(faqs.content);
      this.sharedState.id = faqs._id;
      this.sharedState.reply = faqs.reply;
      this.sharedState.content = faqs.content;
    });
  }

  deleteRequestIndependently() {
    test(`Deleting that random faq,\t\t\t[=> DELETE\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      const checkFAQ = await FAQ.findOne({
        _id: this.sharedState.id
      }).exec();
      expect(checkFAQ).toEqual(null);
    });
  }

  postRequestDependently() {}

  getRequestDependently() {}

  putRequestDependently() {}

  deleteRequestDependently() {}
}

module.exports = FAQsTest;
