const uuid = require('uuid')

class AuthorizedUser
{
    constructor(name)
    {
        this.name=name;
        this.id = uuid.v4();
    }
}

module.exports=AuthorizedUser;