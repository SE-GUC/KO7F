const nfetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const Event = require("../../models/Event");

class EventsTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id: null,
      name: null,
      details: null,
      rating: null,
      event_date: null
    };
  }

  runIndependently() {
    super.runIndependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure independent events routes work", () => {
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
        describe("Making sure dependent events routes work", () => {
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
      name: "Sokna",
      details: "from 12-5-2019 to 20-5-2019",
      event_date: new Date(1859, 1, 1)
    };

    test(`Randomly creating a new event,\t\t[=> POST\t${
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
      const event = await Event.findOne(requestBody).exec();
      expect(event).toMatchObject(requestBody);
      this.sharedState.id = event._id;
      this.sharedState.name = event.name;
      this.sharedState.details = event.details;
      this.sharedState.rating = event.rating;
      this.sharedState.event_date = event.event_date;
    });
  }

  getRequestIndependently() {
    test(`Fetching the data of that random event,\t[=> GET\t\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      expect(jsonResponse.data.name).toEqual(this.sharedState.name);
      expect(jsonResponse.data.details).toEqual(this.sharedState.details);
      expect(jsonResponse.data.rating).toEqual(this.sharedState.rating);
      expect(new Date(jsonResponse.data.event_date)).toEqual(
        this.sharedState.event_date
      );
    });
  }

  putRequestIndependently() {
    const requestBody = {
      name: "Sa7el",
      details: "from 12-5-2020 to 20-5-2020",
      event_date: new Date(500, 1, 1)
    };
    test(`Updating the data of that random event,\t[=> PUT\t\t${
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

      const event = await Event.findOne(requestBody).exec();
      expect(jsonResponse.data.name).toEqual(event.name);
      expect(jsonResponse.data.details).toEqual(event.details);
      expect(jsonResponse.data.rating).toEqual(event.rating);
      expect(new Date(jsonResponse.data.event_date)).toEqual(event.event_date);
      this.sharedState.id = event._id;
      this.sharedState.name = event.name;
      this.sharedState.details = event.details;
      this.sharedState.rating = event.rating;
      this.sharedState.event_date = event.event_date;
    });
  }

  deleteRequestIndependently() {
    test(`Deleting that random event,\t\t\t[=> DELETE\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      const checkEvent = await Event.findOne({
        _id: this.sharedState.id
      }).exec();
      expect(checkEvent).toEqual(null);
    });
  }

  postRequestDependently() {}

  getRequestDependently() {}

  putRequestDependently() {}

  deleteRequestDependently() {}
}

module.exports = EventsTest;
