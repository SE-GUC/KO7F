const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const AuthorizedSchema = new Schema
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

const AuthorizedSchema =  mongoose.model('AuthorizedUser_DB',AuthorizedSchema)

/*class Create_Account
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
*/
module.exports= Create_Account;