require("dotenv").config();
const mongoose = require("mongoose");

<<<<<<< Updated upstream:__tests__/index.js
const EventsTest = require("./scenarios/events");
const PortalLibrariesTest = require("./scenarios/portalLibraries");
=======
const EventsTest = require("./routes/tests/events");
const Userstest = require ("./routes/tests/users");
const PortalLibrariesTest = require("./routes/tests/portalLibraries");
>>>>>>> Stashed changes:test.js

const PORT = 3000;

// mongo config
<<<<<<< Updated upstream:__tests__/index.js
const db = require("../config/keys").mongoURI;
=======
const db = require("./config/keys").mongoURI;
>>>>>>> Stashed changes:test.js

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
const usersTests = new Userstest(PORT, "/users");
const portalLibrariesTests = new PortalLibrariesTest(PORT, "/portal_libraries");

describe("Let me first run the independent tests", () => {
  Promise.all([
    eventsTests.runIndependently(),
    usersTests.runIndependently(),
    portalLibrariesTests.runIndependently()
  ]).then(result => {
    describe("Now running the dependent tests", () => {
      Promise.all([
        eventsTests.runDependently().then(_ => {}),
        usersTests.runDependently().then(_ => {}),
        portalLibrariesTests.runDependently().then(_ => {})
      ]).then(result => {});
    });
  });
});
