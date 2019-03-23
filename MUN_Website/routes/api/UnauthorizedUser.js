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

router.delete('/:id', async (req,res) => 
{
    try 
    {
        const id = req.params.id
        const deletedUnauthorizedUser = await Event.findByIdAndRemove(id)
        res.json({msg:'user was deleted successfully', data: deletedUnauthorizedUser})
    }
    catch(error) 
    {
        console.log(error)
    }  
 })
module.exports = router;