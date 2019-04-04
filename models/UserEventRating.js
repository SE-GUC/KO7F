const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId;

const UserEventRatingschema= new Schema({
    user_id:
    {
        type: ObjectId,
        required: true
    },
    event_id:
    {
        type: ObjectId,
        required: true
    },
    rating:
    {
        type: Number,
        required: true
    }
})

const userEventRating =  mongoose.model('UserEventRating_DB', UserEventRatingschema)
module.exports = userEventRating

