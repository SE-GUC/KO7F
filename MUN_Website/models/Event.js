const uuid = require('uuid')

class Event
{
    constructor(event_id,name, details)
    {
        this.event_id = event_id;
        this.name=name;
        this.details=details;
        this.id = uuid.v4();
    }
}

module.exports = Event;