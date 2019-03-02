const express = require('express')
const router = express.Router()
const uuid = require('uuid');

const RegistrationForm = require('../../models/RegistrationForm')

const RegistrationFormsArr = 
[
    new RegistrationForm(1,'Omar','BI','omar.alarousi@guc.edu.eg'),
    new RegistrationForm(2,'Mohamed','MET','mohamed.samer@guc.edu.eg')
];

//As a Non Authorized User I should be able to submit a form 
router.post('/Register',(req,res) =>
{
    const RegistrationForm_id = RegistrationFormsArr.length+1; 
    const name= req.body.name;
    const major= req.body.major;
    const email= req.body.email;

    const v =
    {
        RegistrationForm_id,
        name,
        major,
        email,
        id: uuid.v4(),
    }

     RegistrationFormsArr.push(v)
     res.send(RegistrationFormsArr)
});

module.exports = router