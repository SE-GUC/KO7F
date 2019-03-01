const express = require('express')
const router = express.Router()

const AuthorizedUser = require('../../models/AuthorizedUser');

const AuthorizedUserArr = [
    new AuthorizedUser('Omar'),
    new AuthorizedUser('7ooda')
];

module.exports = router