const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FAQsSchema = new Schema
({
    reply: {
        type :string,
        required :false
    },
    content:{
        type:string,
        required : [true,'content is required']
    },

})
const FAQs =  mongoose.model('FAQs_DB', FAQsSchema)

module.exports = FAQs;
