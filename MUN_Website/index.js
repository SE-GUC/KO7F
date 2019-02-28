const express = require('express');

const Event = require('./routes/api/Event');
const AuthorizedUser = require('./routes/api/AuthorizedUser')

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to MUN</h1>
    <a href="/api/Event">Event</a>
    `);
})

//calling the methods I made on the authorized user
app.use('/api/AuthorizedUser',AuthorizedUser);

// Handling 404
app.use((req, res) => {
    res.status(404).send({err: 'We can not find what you are looking for'});
 })
const port = 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
