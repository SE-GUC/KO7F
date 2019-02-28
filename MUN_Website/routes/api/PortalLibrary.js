const express = require('express')
const router = express.Router()

const Book = require('../../models/PortalLibrary')

const Library = [
    new PortalLibrary('1st Meeting', 'We agreed on ...'),
    new PortalLibrary('2nd Meeting', 'We decided to ...')
];

router.get('/', (req, res) => res.json({ data: books }))

module.exports = router