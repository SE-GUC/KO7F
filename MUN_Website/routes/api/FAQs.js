const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

const FAQs = require('../../models/FAQs')
const validator = require('../../validations/FAQsValidations')

/*const FAQsArr =
[
  new FAQs=(1,'am i supposed to fail this course'),
  new FAQs=(2,'ko7f')


];*/




//As an Authorized User I should be able to read FAQs
router.get('/FAQs', (req, res) => res.json({ data : FAQsArr }))





/*As an unAuthorized User I should be able to create FAQs
router.post('/CreateFAQs', (req, res) =>
{
    const FAQs_id=req.body.FAQs_id;
    const reply = req.body.reply;
    const content=req.body.content;
    
    if (!FAQs_id || typeof FAQs_id !== 'number') 
        return res.status(404).send({err:'You must enter the Event ID and as an integer'});
    if (reply) 
        return res.send({err: 'you are unauthorized to respond to FAQs'});
    if (!content) 
        return res.status(404).send({err: 'You must enter content'});

    const Created_FAQs = 
    {
        FAQs_id,
        reply,
        content,
        id: uuid.v4(),
    };

    EventsArr.push(Created_FAQs)
    res.send(FAQsArr)
});
//As an Authorized User I should be able to respond to FAQs or update FAQs
router.put('/UpdateFAQs/:id',(req,res) => 
{
    const isEntered = FAQsArr.some(FAQs => FAQs.FAQs_id===parseInt(req.params.id));
    if(isEntered)
    {
        const FAQsUpdated=req.body;
        FAQsArr.forEach(FAQs => 
        {
            if (FAQs.FAQs_id===parseInt(req.params.id))
            {
                FAQs.reply=FAQsUpdated.reply?FAQsUpdated.reply:FAQs.reply;
                FAQs.content=FAQsUpdated.content?FAQsUpdated.content:FAQs.content;
                res.json({msg: 'The FAQs are updated successfully', FAQs});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Nothing have changed'})  
    }
});
//As an admin User I should be able to delete FAQs (will be impplemented in:front end)
router.delete('/DeleteFAQs/:id',(req,res) => 
{    
    
    const isEntered = FAQsArr.some(FAQs => FAQs.FAQs_id===parseInt(req.params.id));
    if(isEntered)
    {
        FAQsArr.forEach(FAQs => 
        {
            if (FAQs.FAQs_id===parseInt(req.params.id))
            { 
                delete FAQs.FAQs_id;
                delete FAQs.reply;
                delete FAQs.content;
                delete FAQs.id;
                res.json({msg:'The FAQs is deleted successfully', FAQsArr});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Error on deleting the FAQs'})  
    }
});

module.exports = router*/


//As an Authorized User I should be able to add to the FAQs
router.post('/', async (req,res) => 
{   
    try 
    {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newFAQs = await FAQs.create(req.body)
        res.json({msg:'question was created successfully', data: newFAQs})
        res.send(newFAQs)
    }
    catch(error) 
    {
        console.log(error)
    }
})
//As an Authorized User I should be able to update Events
router.put('/:id', async (req,res) => {
    try 
    {
        const IsFAQs = await FAQs.findOne(req.param.id)
     
        if(!IsFAQs) 
            return res.status(404).send({error: 'Event does not exist'})
        
        const isValidated = validator.updateValidation(req.body)
        
        if (isValidated.error) 
            return res.status(400).send({ error: isValidated.error.details[0].message })
        
        const updatedFAQs = await FAQs.updateOne(req.body)
        res.json({msg: 'FAQ has been replied to successfully',data: updatedFAQs})
    }
    catch(error) 
    {
        console.log(error)
    }  
 })
 module.exports = router


























  


