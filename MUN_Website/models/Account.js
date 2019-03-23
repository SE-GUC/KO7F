const uuid = require('uuid')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AccountSchema = new Schema
({
    username: {
        type: String,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'Details field is required']
    },
    age: {
        type: Number,
        required: false
    }
    ,
    major: {
        type: String,
        required: [true, 'Details field is required']
    },
})

const event =  mongoose.model('Event_DB', EventSchema)
module.exports = Account

/*class Account
{
    constructor(Account_id, username, password, age, major)
    {
        this.Account_id = Account_id;
        this.username = username;
        this.password = password
        this.age = age;
        this.major = major;
        this.id = uuid.v4();
    }
}
*/
module.exports = Account;