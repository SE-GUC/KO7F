const Joi = require('joi')

module.exports = 
{
    createValidation: request => 
    {
        const createSchema = 
        {
            name: Joi.string().min(3).max(50).required(),
            details: Joi.string().min(3).required(),
            rating: Joi.number().min(1).max(5)
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => 
    {
        const updateSchema = 
        {
            name: Joi.string().min(3).max(50),
            details: Joi.string().min(3),
            rating: Joi.number().min(1).max(5)
        }

        return Joi.validate(request, updateSchema)
    }, 
}