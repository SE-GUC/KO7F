const joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userEventRating= require('../../models/UserEventRating')
const Event = require("../../models/Event");

//= =---------------------------------------------------= =//
//= =--- HANDLE events lists
//= =---------------------------------------------------= =//
router
  .route("/")
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      name: joi
        .string()
        .min(3)
        .max(50)
        .required(),
      details: joi
        .string()
        .min(3)
        .required(),
      rating: joi
        .number()
        .min(1)
        .max(5)
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    try {
      const event = await new Event({
        _id: mongoose.Types.ObjectId(),
        name: request.body.name,
        details: request.body.details,
        rating: request.body.rating
      }).save();
      return response.json({ data: event });
    } catch (err) {
      return response.json({
        error: `Error, couldn't create a new event with the following data`
      });
    }
  })
  .get(async (request, response) => {
    try {
      const allEvents = await Event.find({}).exec();
      return response.json({ data: allEvents });
    } catch (err) {
      return response.json({
        error: `Error, Couldn't fetch the list of all events from the database`
      });
    }
  });
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE event detail
//= =---------------------------------------------------= =//
router
  .route("/:id")
  .all(async (request, response, next) => {
    const status = joi.validate(request.params, {
      id: joi
        .string()
        .length(24)
        .required()
    });
    if (status.error) {
      return response.json({ error: status.error.details[0].message });
    }
    next();
  })
  .get(async (request, response) => {
    try {
      const event = await Event.findById(request.params.id).exec();
      return response.json({ data: event });
    } catch (err) {
      return response.json({
        error: `Error, couldn't find an event given the following id`
      });
    }
  })
  .put((request, response) => {
    Event.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true },
      (err, model) => {
        if (!err) {
          return response.json({ data: model });
        } else {
          return response.json({
            error: `Error, couldn't update an event given the following data`
          });
        }
      }
    );
  })
  .delete((request, response) => {
    Event.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null });
      } else {
        return response.json({
          error: `Error, couldn't delete an event given the following data`
        });
      }
    });
  });


  router.put('/RateEvent/:id', (req,res) =>
  {
      // const isEntered = EventsArr.some(Event => Event.event_id===parseInt(req.params.id));
      // if(isEntered)
      // {
          const eventUpdated=req.body.rating;
          const userid= req.body.userid
          EventsArr.forEach(Event => 
          {
              if (Event.event_id===parseInt(req.params.id))
              {
                  userEventRating.userid= userid
                  userEventRating.eventid= req.params.id
                  userEventRating.rating=eventUpdate
                  res.json({msg: 'You have successfully rated the Event', Event});
                  let sum=0
                  for(let i=0;i<userEventRating.length;i++){
                      sum= sum+ userEventRating.rating
                  }
                  userEventRating.rating=sum/userEventRating.length
              }
          })
  //    }
      // else
      // {
      //   res.status(404).json({msg: 'Nothing have changed'})  
      // }
  })
module.exports = router;
