const uuid = require('uuid')

class Timeline
{
    constructor(Timeline_id,Event)
    {
        this.Timeline_id = Timeline_id;
        this.Event = Event;
        this.id = uuid.v4();
    }
}

module.exports = Timeline;