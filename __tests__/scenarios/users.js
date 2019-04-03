const nfetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const user = require("../../models/User");

class Userstest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id: null,
      name: null,
      password: null,
      age: null,
      major: null,
      admin: null,
    };
  }

  runIndependently() {
    super.runIndependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure independent users routes work", () => {
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
        describe("Making sure dependent users routes work", () => {
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
      name: "ahmed",
      password: "12345",
      age: 5,
      major: "BI",
      admin: true

    };

    test(`Randomly creating a new user,\t\t[=> POST\t${
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
      const user = await user.findOne(requestBody).exec();
      expect(user).toMatchObject(requestBody);
      this.sharedState.id = user._id;
      this.sharedState.name = user.name;
      this.sharedState.password = user.password;
      this.sharedState.age = user.age;
      this.sharedState.admin=user.admin
      
    });
  }

  getRequestIndependently() {
    test(`Fetching the data of that random user,\t[=> GET\t\t${
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
      expect(jsonResponse.data.password).toEqual(this.sharedState.password);
      expect(jsonResponse.data.age).toEqual(this.sharedState.age);
      expect(jsonResponse.data.major).toEqual(this.sharedState.major);
      expect(jsonResponse.data.admin).toEqual(this.sharedState.admin);

    });
  }

  putRequestIndependently() {
    const requestBody = {
      name: "Mohamed",
      password: "5678",
      age: 50,
      major: "mang",
      admin: false
    };
    test(`Updating the data of that random user,\t[=> PUT\t\t${
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

      const user = await user.findOne(requestBody).exec();
      expect(jsonResponse.data.name).toEqual(user.name);
      expect(jsonResponse.data.password).toEqual(user.password);
      expect(jsonResponse.data.age).toEqual(user.age);
      expect(jsonResponse.data.major).toEqual(user.major);
      expect(jsonResponse.data.admin).toEqual(user.admin);


      this.sharedState.id = user._id;
      this.sharedState.name = user.name;
      this.sharedState.password = user.password;
      this.sharedState.age = user.age;
      this.sharedState.major = user.major;
      this.sharedState.admin = user.admin;

    });
  }

  deleteRequestIndependently() {
    test(`Deleting that random user,\t\t\t[=> DELETE\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      const checkuser = await user.findOne({
        _id: this.sharedState.id
      }).exec();
      expect(checkuser).toEqual(null);
    });
  }

  postRequestDependently() {}

  getRequestDependently() {}

  putRequestDependently() {}

  deleteRequestDependently() {}
}

module.exports = Userstest;
