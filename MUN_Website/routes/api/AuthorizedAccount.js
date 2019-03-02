// HAZEM ISMAIL....!!
const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const AccountArr = 
[
    new Account(1,'zozza','kojo911',21,'BI'),
    new Account(2,'ghozza','mojo911',20,'BI')
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

//update
router.put('/UpdateAccount/:Account_id',(req,res) => 
{
    const isEntered = AccountArr.some(Account => Account.event_id===parseInt(req.params.id));
    if(isEntered)
    {
        const accountUpdated=req.body;
        AccountArr.forEach(Account => 
        {
            if (Account.event_id===parseInt(req.params.id))
            {
                Account.name=accountUpdated.name?accountUpdated.name:Account.name;
                Account.details=accountUpdated.details?accountUpdated.details:Account.details;
                res.json({msg: 'The account is updated successfully', Account});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Nothing have changed'})  
    }
});

//Delete
router.delete('/DeleteAccount/:id',(req,res) => 
{
    const isEntered = AccountArr.some(Account => Account.account_id===parseInt(req.params.id));
    if(isEntered)
    {
        AccountArr.forEach(Account => 
        {
            if (Account.account_id===parseInt(req.params.id))
            { 
                delete Account.account_id;
                delete Account.name;
                delete Account.details;
                delete Account.rating;
                delete Account.id;
                res.json({msg:'The account is deleted successfully', AccountArr});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Error on deleting the Account'})  
    }
});

module.exports = router