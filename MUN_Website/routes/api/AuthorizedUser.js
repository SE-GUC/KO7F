const express = require('express')
const router = express.Router()

const AuthorizedUser = require('../../models/AuthorizedUser');

const AuthorizedUserArr = [
    new AuthorizedUser('Omar'),
    new AuthorizedUser('7ooda')
];

//
router.delete('/DeleteAccount/:id',(req,res) => 
{
    const isEntered = EventsArr.some(Event => Event.Account_id===parseInt(req.params.id));
    if(isEntered)
    {
        AccountsArr.forEach(Event => 
        {
            if (Accounts.Account_id===parseInt(req.params.id))
            { 
                delete Accounts.Account_id;
                delete Accounts.username;
                delete Accounts.password;
                delete Accounts.age;
                delete Accounts.major;
                res.json({msg:'The account is deleted successfully', AccountsArr});
            }
        })
    }
    else
    {
      res.status(404).json({msg: 'Error on deleting the account'})  
    }
});

module.exports = router