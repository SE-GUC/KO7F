const express = require('express');
const bodyParser = require('body-parser');
const Events = require('./routes/api/Events');
const PortalLibraries = require('./routes/api/PortalLibraries')
const RegistrationForms = require('./routes/api/RegistrationForms')
const Timelines = require('./routes/api/Timelines')

//set up express
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to MUN</h1>
    <a href="/api/Event">Event</a>
    `);
})

//calling the methods on Timelines class
app.use('/api/Timeline',Timelines);

//calling the methods on RegistrationForms class
app.use('/api/RegistrationForm',RegistrationForms);

//calling the methods on Events class
app.use('/api/Event',Events);

//calling the methods on PortalLibraries class
app.use('/api/PortalLibrary',PortalLibraries);

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })
const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
