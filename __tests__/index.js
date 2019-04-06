require("dotenv").config();
const mongoose = require("mongoose");

const EventsTest = require("./scenarios/events");
const PortalLibrariesTest = require("./scenarios/portalLibraries");
const QuestionsTest= require("./scenarios/questions");
const UsersTest = require("./scenarios/users");
const FAQsTest = require("./scenarios/faqs");

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
const usersTests = new UsersTest(PORT, "/users");
const portalLibrariesTests = new PortalLibrariesTest(PORT, "/portal_libraries");
const questionsTests= new QuestionsTest(PORT, "/questions");
=======
const faqsTest = new FAQsTest(PORT, "/faqs");

describe("Let me first run the independent tests", () => {
  Promise.all([
    eventsTests.runIndependently(),
    portalLibrariesTests.runIndependently(),
    questionsTests.runIndependently(),
    usersTests.runIndependently(),
  ]).then(result => {
    describe("Now running the dependent tests", () => {
      Promise.all([
        eventsTests.runDependently().then(_ => {}),
        portalLibrariesTests.runDependently().then(_ => {}),
        questionsTests.runDependently().then(_ => {}),
        usersTests.runDependently().then(_ => {}),
        portalLibrariesTests.runDependently().then(_ => {}),
        faqsTest.runDependently().then(_ => {})
      ]).then(result => {});
    });
  });
});
