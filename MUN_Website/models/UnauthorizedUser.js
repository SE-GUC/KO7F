const uuid = require('uuid');

//The UnauthorizedUser
class UnauthorizedUser
{
    constructor(username, password)
    {
        this.id = uuid.v4();
        this.username=username;
        this.password = password;
    }
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const UnauthorizedUserSchema = new Schema
({
    username: {
        type: String,
        required: [true, 'username field is required']
    },
    password : {
        type: String,
        required: [true, 'PASSWORD FIELD IS REQUIRED']
    },

})

const  UnauthorizedUser =  mongoose.model(' UnauthorizedUser_DB',  UnauthorizedUserSchema)

module.exports = UnauthorizedUser;
//////////