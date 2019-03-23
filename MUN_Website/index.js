const express = require('express');
//const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// Require Router Handlers
const Events = require('./routes/api/Events');
const PortalLibraries = require('./routes/api/PortalLibraries')
const RegistrationForms = require('./routes/api/RegistrationForms')
const Timelines = require('./routes/api/Timelines')
const UnauthorizedUser = require('./routes/api/UnauthorizedUser')
const Accounts = require('./routes/api/Accounts');
const Announcement = require ('./routes/api/Announcement');
const Questions = require('./routes/api/Questions')
const AuthorizedUser=require('./routes/api/AuthorizedUser')

//set up express
const app = express();

// DB Config
const db = require('./config/Key_Dev').mongoURI

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//app.use(bodyParser.json());

//entry point
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to MUN</h1>
    <a href="/api/Event">Event</a>
    `);
})

//calling the methods on Questions class
app.use('/api/Question',Questions);

//calling the methods on Announcement class
app.use('/api/Announcement',Announcement);

//calling the methods on Accounts class
app.use('/api/Account',Accounts);

//calling the methods on Timelines class
app.use('/api/Timeline',Timelines);

//calling the methods on RegistrationForms class
app.use('/api/RegistrationForm',RegistrationForms);

//calling the methods on Events class
app.use('/api/Event',Events);

//calling the methods on PortalLibraries class
app.use('/api/PortalLibrary',PortalLibraries);

//calling the methods on UnauthorizedUser class
app.use('/api/Unauthorizeduser', UnauthorizedUser);

//calling the methods on authorized account 
app.use ('/api/AuthorizedUser',AuthorizedUser);

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })
const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
