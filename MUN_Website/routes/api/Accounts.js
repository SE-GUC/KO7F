const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const Account = require('../../models/Account')

const AccountArr = 
[
    new Account(1,'Omar','Point90',20,'BI'),
    new Account(2,'Omar','Point90',25,'MET')
];

router.get('/Account', (req, res) => res.json({ data : AccountArr }))

//As an Non Authorized User I can create my account  using the user name and password
router.post('/CreateAccount', (req, res) =>
{
    const Account_id=req.body.Account_id;
    const username = req.body.username;
    const password=req.body.password;
    const age = req.body.age;
    const major=req.body.major;
    
    if (!Account_id || typeof Account_id !== 'number') 
        return res.status(404).send({err:'You must enter the Account ID and as an integer'});
    if (!username) 
        return res.status(404).send({err: 'You must enter a username'});
    if (!password) 
        return res.status(404).send({err: 'You must enter password'});
    if (!age) 
        return res.status(404).send({err: 'You must enter your age'});
    if (!major) 
        return res.status(404).send({err: 'You must enter your major'});

    const Created_Account = 
    {
        Account_id,
        username,
        password,
        age,
        major,
        id: uuid.v4(),
    };

    AccountArr.push(Created_Account)
    res.send(AccountArr)
});

module.exports = router
