require("dotenv").config();
const mongoose = require("mongoose");

const EventsTest = require("./scenarios/events");
const PortalLibrariesTest = require("./scenarios/portalLibraries");

const PORT = 3000;

// mongo config
const db = require("../config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//= =---------------------------------------------------= =//
// ---== Setup before & after all tests run
//= =---------------------------------------------------= =//
beforeAll(async () => {
  await mongoose.connection.dropDatabase();
});

//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Core tests
//= =---------------------------------------------------= =//
const eventsTests = new EventsTest(PORT, "/events");
const portalLibrariesTests = new PortalLibrariesTest(PORT, "/portal_libraries");

describe("Let me first run the independent tests", () => {
  Promise.all([
    eventsTests.runIndependently(),
    portalLibrariesTests.runIndependently()
  ]).then(result => {
    describe("Now running the dependent tests", () => {
      Promise.all([
        eventsTests.runDependently().then(_ => {}),
        portalLibrariesTests.runDependently().then(_ => {})
      ]).then(result => {});
    });
  });
});
