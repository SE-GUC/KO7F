const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userratingschema= new Schema({
    userid:
    {
        type:mongoose.types.objectid(),
        required: true
    },
    eventid:
    {
        type:mongoose.types.objectid(),
        required: true
    },
    rating:
    {
        type:Number,
        required: true
    }
})

const usereventrating =  mongoose.model('usereventrating', userratingschema)
module.exports = usereventrating

