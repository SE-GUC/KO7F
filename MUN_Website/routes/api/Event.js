const express = require('express')
const router = express.Router()

const Book = require('../../models/Event')

const Library = [
    new PortalLibrary('Event', 'We agreed on ...'),
    new PortalLibrary('Event', 'We decided to ...')
];

router.get('/', (req, res) => res.json({ data: books }))

module.exports = router