const nfetch = require("node-fetch");
const AbstractTests = require("./AbstractTests");
const PortalLibrary = require("../../models/PortalLibrary");

class PortalLibrariesTest extends AbstractTests {
  constructor(PORT, ROUTE) {
    super(PORT, ROUTE);
    this.sharedState = {
      id: null,
      title: null,
      details: null
    };
  }

  runIndependently() {
    super.runIndependently();
    try {
      return new Promise((resolve, reject) => {
        describe("Making sure independent PortalLibraries routes work", () => {
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
        describe("Making sure dependent PortalLibraries routes work", () => {
          this.postRequestDependently();
          this.getRequestDependently();
          this.putRequestIndependently();
          this.deleteRequestIndependently();
        });
        resolve();
      });
    } catch (err) {}
  }

  postRequestIndependently() {
    const requestBody = {
      title: "Sokna",
      details: "from 12-5-2019 to 20-5-2019"
    };

    test(`Randomly creating a new PortalLibrary,\t\t[=> POST\t${
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
      const portalLibrary = await PortalLibrary.findOne(requestBody).exec();
      expect(portalLibrary).toMatchObject(requestBody);
      this.sharedState.id = portalLibrary._id;
      this.sharedState.title = portalLibrary.title;
      this.sharedState.details = portalLibrary.details;
    });
  }

  getRequestIndependently() {
    test(`Fetching the data of that random PortalLibrary,\t[=> GET\t\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      expect(jsonResponse.data.title).toEqual(this.sharedState.title);
      expect(jsonResponse.data.details).toEqual(this.sharedState.details);
    });
  }

  putRequestIndependently() {
    const requestBody = {
      title: "Sa7el",
      details: "from 12-5-2020 to 20-5-2020"
    };
    test(`Updating the data of that random portalLibrary,\t[=> PUT\t\t${
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

      const portalLibrary = await PortalLibrary.findOne(requestBody).exec();
      expect(jsonResponse.data.title).toEqual(portalLibrary.title);
      expect(jsonResponse.data.details).toEqual(portalLibrary.details);
      this.sharedState.id = portalLibrary._id;
      this.sharedState.title = portalLibrary.title;
      this.sharedState.details = portalLibrary.details;
    });
  }

  deleteRequestIndependently() {
    test(`Deleting that random PortalLibrary,\t\t\t[=> DELETE\t${
      this.base_url
    }/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });

      // check if the json response has data not error
      const jsonResponse = await response.json();
      expect(Object.keys(jsonResponse)).toEqual(["data"]);

      const checkportalLibrary = await PortalLibrary.findOne({
        _id: this.sharedState.id
      }).exec();
      expect(checkportalLibrary).toEqual(null);
    });
  }

  postRequestDependently() {}

  getRequestDependently() {}

  putRequestDependently() {}

  deleteRequestDependently() {}
}

module.exports = PortalLibrariesTest;
