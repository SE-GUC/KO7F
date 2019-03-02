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

///////////////// YOU CAN UPDATE MY ACCOUNT ////////////////////////////////////////
//As an Authorized User I should be able to update Events
    router.put('/Updateaccount/: Account_id,',(req,res) => 
{Account
const isEntered = AccountArr.some(Account =>Account.Account_id===parseInt(req.params.Account_id));
    if(isEntered)
    {
        const AccountUpdated=req.body;
        AccountArr.forEach(Account=> 
        {
            if (Account.Account_id===parseInt(req.params.Account_id))
            {
                Account.name=AccountUpdated.name?AccountUpdated.name:Account.name;
                Account.username=Accountusername.username?AccountUpdated.username:Account.username;
                Account.password=AccountUpdated. password?AccountUpdated. password:Account. password;
                Account.age=AccountUpdated.age?AccountUpdated.age:Account.age;
                Account. major=AccountUpdated. major?AccountUpdated. major:Account. major;

                
                res.json({msg: 'The Account is updated successfully',  Account});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Nothing have changed'})  
    }
});

/////////////////////As an Authorized User I should be able to delete Events////////////
router.delete('/DeleteAccount/: Account_id',(req,res) => 
{
    const isEntered =  AccountArr.some( Account =>  Account. Account_id===parseInt(req.params. Account_id));
    if(isEntered)
    {
        EventsArr.forEach( Account => 
        {
            if ( Account. Account_id===parseInt(req.params. Account_id))
            { 
                delete  Account. Account_id;
                delete  Account.username;
                delete  Account.password;
                delete  Account.age;
                delete  Account. major;
                res.json({msg:'The Account is deleted successfully', AccountArr});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Error on deleting the Account'})  
    }
});

module.exports = router
