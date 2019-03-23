const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Create the schema
const UnauthorizedUserSchema = new Schema
({
    username: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'Details field is required']
    },
    }
)

const UnauthorizedUser =  mongoose.model('UnauthorizedDB', UnauthorizedUserSchema)
module.exports = UnauthorizedUser
