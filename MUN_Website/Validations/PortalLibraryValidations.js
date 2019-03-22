const Joi = require('joi')

module.exports = 
{
    createValidation: request => 
    {
        const createSchema = 
        {
            title: Joi.string().min(3).max(50).required(),
            details: Joi.string().min(3).required()
        }

        return Joi.validate(request, createSchema)
    }
}    