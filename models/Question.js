
// The Question Model
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const QuestionSchema= new Schema
({
    quest:{
        type:String,
        required:[true, 'Question field is required']
    },
    question_id:{
        type:Number,
        required: [true, 'id is required']
    },
    sumbit_user:{
        type: String,
        required:[true, 'username required']

    }

});

const question = mongoose.model('Question_DB', QuestionSchema)
module.exports = question;
