const express = require("express");
const mongoose = require("mongoose");

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

//entry point
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to MUN</h1>
    <a href="/api/events">Events</a>
    `);
});

//calling the methods on Questions class
app.use("/api/questions", Questions);

//calling the methods on Announcement class
app.use("/api/announcements", Announcement);

//calling the methods on Accounts class
app.use("/api/accounts", Accounts);

//calling the methods on Timelines class
app.use("/api/timelines", Timelines);

//calling the methods on RegistrationForms class
app.use("/api/registration_forms", RegistrationForms);

//calling the methods on Events class
app.use("/api/events", Events);

//calling the methods on PortalLibraries class
app.use("/api/portal_libraries", PortalLibraries);

//calling the methods on UnauthorizedUser class
app.use("/api/unauthorized_users", UnauthorizedUser);

//calling the methods on authorized account
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
