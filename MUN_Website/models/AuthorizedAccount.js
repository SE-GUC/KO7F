const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Auth-account

const authorizedUserSchema = new Schema
({
    username: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'password field is required']
    },
    age: {
        type: String,
        required: false
    },
    major: {
        type: string,
        required: false
    }},
)

const authorizedUser =  mongoose.model('authorizedDB', authorizedUserSchema)
module.exports = authorizedUser