const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const Event = require('../../models/Event')

const EventsArr = 
[
    new Event(1,'Cinema gathering','Point 90',5),
    new Event(2,'Football match','Mal3ab El Bokhary',5)
];

//As an Authorized User and Non Authorized User I should be able to read Events 
router.get('/Event', (req, res) => res.json({ data : EventsArr }))

//As an Authorized User I should be able to create Events
router.post('/CreateEvent', (req, res) =>
{
    const event_id=req.body.event_id;
    const name = req.body.name;
    const details=req.body.details;
    
    if (!event_id || typeof event_id !== 'number') 
        return res.status(404).send({err:'You must enter the Event ID and as an integer'});
    if (!name) 
        return res.status(404).send({err: 'You must enter a name'});
    if (!details) 
        return res.status(404).send({err: 'You must enter details'});

    const Created_Event = 
    {
        event_id,
        name,
        details,
        id: uuid.v4(),
    };

    EventsArr.push(Created_Event)
    res.send(EventsArr)
});

//As an Authorized User I should be able to update Events
router.put('/UpdateEvent/:id',(req,res) => 
{
    const isEntered = EventsArr.some(Event => Event.event_id===parseInt(req.params.id));
    if(isEntered)
    {
        const eventUpdated=req.body;
        EventsArr.forEach(Event => 
        {
            if (Event.event_id===parseInt(req.params.id))
            {
                Event.name=eventUpdated.name?eventUpdated.name:Event.name;
                Event.details=eventUpdated.details?eventUpdated.details:Event.details;
                res.json({msg: 'The event is updated successfully', Event});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Nothing have changed'})  
    }
});

//As an Authorized User I should be able to delete Events
router.delete('/DeleteEvent/:id',(req,res) => 
{
    const isEntered = EventsArr.some(Event => Event.event_id===parseInt(req.params.id));
    if(isEntered)
    {
        EventsArr.forEach(Event => 
        {
            if (Event.event_id===parseInt(req.params.id))
            { 
                delete Event.event_id;
                delete Event.name;
                delete Event.details;
                delete Event.rating;
                delete Event.id;
                res.json({msg:'The event is deleted successfully', EventsArr});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Error on deleting the Event'})  
    }
});

//As an Non Authorized User I should be able to rate Events
router.put('/RateEvent/:id', (req,res) =>
{
    const isEntered = EventsArr.some(Event => Event.event_id===parseInt(req.params.id));
    if(isEntered)
    {
        const eventUpdated=req.body;
        EventsArr.forEach(Event => 
        {
            if (Event.event_id===parseInt(req.params.id))
            {
                Event.rating=eventUpdated.rating?eventUpdated.rating:Event.rating;
                res.json({msg: 'You have successfully rated the Event', Event});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Nothing have changed'})  
    }
})


module.exports = router