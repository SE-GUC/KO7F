const uuid = require('uuid')

class Account
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

module.exports = Account;