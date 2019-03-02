const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const Timeline = require('../../models/Timeline')
const Event = require('../../models/Event')

const TimelineArr = 
[
    new Timeline(1,Event),
    new Timeline(2,Event)
];

// As a Non Authorized User I should be able to read the Timeline 
router.get('/Timeline', (req, res) => res.json({ data : TimelineArr }))

module.exports = router