const express = require('express');
const router = express.Router();

const AuthorizedUser = require('../../models/AuthorizedUser');

const AuthorizedUserArr = [
    new AuthorizedUser('Omar'),
    new AuthorizedUser('7ooda')
];

//As an authorized user i should be able to read events
router.get('/Event', (req, res) => res.json({ EventArr }))

//As an authorized user i should be able to create events
router.post('/Event', (req, res) => {
    res.send({type:'POST'});
});

//As an authorized user i should be able to edit events
router.put('/Event/:id', (req, res) => {
    res.send({type:'PUT'});
});

module.exports = router;