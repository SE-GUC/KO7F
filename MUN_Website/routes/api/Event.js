const express = require('express')
const router = express.Router()

const Event = require('../../models/Event')

const EventArr = [
    new Event('Cinema gathering','Point 90'),
    new Event('Football match','Mal3ab El Bokhary')
];

router.get('/', (req, res) => res.json({  EventArr  }))


module.exports = router