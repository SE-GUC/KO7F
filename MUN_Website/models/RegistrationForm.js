const uuid = require('uuid')

class RegistrationForm
{
    constructor(RegistrationForm_id,name, major, email)
    {
        this.RegistrationForm_id = RegistrationForm_id;
        this.name=name;
        this.major=major;
        this.email=email;
        this.id = uuid.v4();
    }
}

module.exports = RegistrationForm;