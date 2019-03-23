const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const UnauthorizedUser = require('../../models/UnauthorizedUser');
const UnauthorizedUsers = [];

//I can create account  using the user name and password
router.post('/', (req, res) => {
    const username = req.body.username;
	const password = req.body.password;
	if (!username) return res.status(400).send({ err: 'Username field is required' });
	if (!password) return res.status(400).send({ err: 'Password field is required' });
	const unauthorizedUser = {
        id: uuid.v4(),
        username,
		password,
    };
    UnauthorizedUsers.push(unauthorizedUser)
	res.send(unauthorizedUser)
})

//I can update account like profile attributes
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const unauthorizedUser = UnauthorizedUsers.find(u => u.id === id);
    if (username) {
        unauthorizedUser.username = username;
    }
	if (password) {
        unauthorizedUser.password = password;
    }
	res.send(unauthorizedUser)
})

//I can delete account 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const unauthorizedUser = UnauthorizedUsers.find(u => u.id === id);
    const index = UnauthorizedUsers.indexOf(unauthorizedUser);
    UnauthorizedUsers.splice(index,1)
    res.send(UnauthorizedUsers)
})

//Get all users
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const unauthorizedUser = UnauthorizedUsers.find(u => u.id === id);
    res.send(unauthorizedUser)
})

//Get user
router.get('/', (req, res) => {
    res.send(UnauthorizedUsers)
})

// as authorized user i can delete unathorized user 
router.delete('/:id',(req,res) => 
{
    const isEntered = UnauthorizedUsers.some(UnauthorizedUser => UnauthorizedUser.id===parseInt(req.params.id));
    if(isEntered)
    {
        UnauthorizedUsers.forEach(UnauthorizedUser => 
        {
            if (UnauthorizedUser.id===parseInt(req.params.id))
            { 
    
                delete UnauthorizedUser.id;
                delete UnauthorizedUser.name;
                delete unauthorizedUser.password;

                res.json({msg:'The user  is deleted successfully', UnauthorizedUsers});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Error on deleting this user'})  
    }
});

module.exports = router;

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const UnauthorizedUser = require('../../models/UnauthorizedUser')
const validator = require('../../validations/UnauthorizedUserValidations')

///////////////////////////////////////////////////
router.get('/', async (req,res) => {
    const UnauthorizedUser = await UnauthorizedUser.find()
    res.json({data: UnauthorizedUser})
})

//As an Authorized User I should be able to create Events
router.post('/', async (req,res) => 
{   
    try 
    {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
        const newUnauthorizedUser = await UnauthorizedUser.create(req.body)
        res.json({msg:'UnauthorizedUser was created successfully', data: newUnauthorizedUser})
        res.send(newUnauthorizedUser)
    }
    catch(error) 
    {
        console.log(error)
    }
})
/////////////////////////////////////

router.put('/:id', async (req,res) => {
    try 
    {
        const IsUnauthorizedUser = await  UnauthorizedUser.findOne(req.param.id)
     
        if(!IsUnauthorizedUser) 
            return res.status(404).send({error: ' UnauthorizedUser does not exist'})
        
        const isValidated = validator.updateValidation(req.body)
        
        if (isValidated.error) 
            return res.status(400).send({ error: isValidated.error.details[0].message })
        
        const updatedUnauthorizedUser = await  UnauthorizedUser.updateOne(req.body)
        res.json({msg: ' UnauthorizedUser updated successfully',data: updatedUnauthorizedUser})
    }
    catch(error) 
    {
        console.log(error)
    }  
 })


///////////////////////////////
router.delete('/:id', async (req,res) => 
{
    try 
    {
        const id = req.params.id
        const deletedUnauthorizedUser = await UnauthorizedUser.findByIdAndRemove(id)
        res.json({msg:'UnauthorizedUser was deleted successfully', data: deletedUnauthorizedUser})
    }
    catch(error) 
    {
        console.log(error)
    }  
 })

module.exports = router



