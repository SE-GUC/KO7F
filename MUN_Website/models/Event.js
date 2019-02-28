const uuid = require('uuid')

class Event
{
    constructor(name, details)
    {
        this.name=name;
        this.details=details;
        this.id = uuid.v4();
    }
}

module.exports = Event;