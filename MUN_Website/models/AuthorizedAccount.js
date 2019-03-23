
//Auth-account
const uuid = require('uuid')

class Create_Account
{
    constructor(Account_id, name, password, age, major)
    {
        this.Account_id = Account_id;
        this.username = username;
        this.password = password
        this.age = age;
        this.major = major;
        this.id = uuid.v4();
    }
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema
////
// Create the schema
const  AuthorizedAccountSchema = new  AuthorizedAccount
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
        type: Number,
        required:  [true, 'Age field is required']
    },
    major: {
        type: String,
        required: [true, 'major field is required']
    }
})

const AuthorizedAccount =  mongoose.model(' AuthorizedAccount_DB',  AuthorizedAccountSchema)


module.exports= Create_Account;
