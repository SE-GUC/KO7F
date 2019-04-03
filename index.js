require("dotenv").config();
const Logger = require("./middlewares/Logger");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Require Router Handlers
const Events = require("./routes/api/events");
const PortalLibraries = require("./routes/api/portalLibraries");
const RegistrationForms = require("./routes/api/registrationForms");
const Timelines = require("./routes/api/timelines");
const UnauthorizedUser = require("./routes/api/unauthorizedUser");
const Accounts = require("./routes/api/accounts");
const Announcement = require("./routes/api/announcement");
const Questions = require("./routes/api/questions");
const AuthorizedUser = require("./routes/api/authorizedUser");

//set up express
const app = express();

// middleware
app.use((request, response, next) => {
  Logger.log(`${request.method} => ${request.originalUrl}`);
  next();
});

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//entry point
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to MUN</h1>
    <a href="/api/events">Events</a>
    `);
});

// handling subroutes
app.use("/api/questions", Questions);
app.use("/api/announcements", Announcement);
app.use("/api/accounts", Accounts);
app.use("/api/timelines", Timelines);
app.use("/api/registration_forms", RegistrationForms);
app.use("/api/events", Events);
app.use("/api/portal_libraries", PortalLibraries);
app.use("/api/unauthorized_users", UnauthorizedUser);
app.use("/api/authorized_users", AuthorizedUser);

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
