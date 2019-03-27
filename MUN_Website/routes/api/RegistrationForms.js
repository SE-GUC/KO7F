const express = require("express");
const router = express.Router();
const uuid = require("uuid");

const RegistrationForm = require("../../models/RegistrationForm");

const RegistrationFormsArr = [
  new RegistrationForm(1, "Omar", "BI", "omar.alarousi@guc.edu.eg"),
  new RegistrationForm(2, "Mohamed", "MET", "mohamed.samer@guc.edu.eg")
];

//As a Non Authorized User I should be able to submit a form
router.post("/Register", (req, res) => {
  const RegistrationForm_id = RegistrationFormsArr.length + 1;
  const name = req.body.name;
  const major = req.body.major;
  const email = req.body.email;

  const v = {
    RegistrationForm_id,
    name,
    major,
    email,
    id: uuid.v4()
  };

  RegistrationFormsArr.push(v);
  res.send(RegistrationFormsArr);
});

// it posts the whole Registration Form
router.postinfo('/', async (req, res) => {
    try {
      if (!req.session.user_id) return res.json({ msg: 'You are not logged in' })
  
      const userOne = await User.findById(req.session.user_id)
  
      if (!userOne.is_admin) return res.json({ msg: 'Only admins can post' })
      const isValidated = validator.createValidation(req.body)
      if (isValidated.error) return res.json({ msg: 'Validations are not met' }) // res.status(400).send({ error: isValidated.error.details[0].message })
      const newRegistrationForm = await RegistrationForm.create(req.body)
      res.json({ msg: 'Registration Form was created successfully', data: newAnnouncements })
    }
    catch (error) {
      console.log(error)
    }
  })

//as a user i could update registeration form
router.put('/:id', async (req, res) => {
    try {
      if (!req.session.user_id) return  res.json({ msg: 'You are not logged in' })
  
      const userOne = await User.findById(req.session.user_id)
  
      if (!userOne.is_admin) return  res.json({ msg: 'Only admins can update' })
      const id = req.params.id
      const registerationform = await RegistrationForm.find({ id })
      if (!registerationform) return  res.json({ msg: 'Registration Form doesnot exist' })
      const isValidated = validator.updateValidation(req.body)
      if (isValidated.error) return  res.json({ msg: 'Validations are not met' })
      const updateRegistrationForm = await RegistrationForm.updateOne(req.body)
      res.json({ msg: 'Registration Form updated successfully' })
    }
    catch (error) {
      // We will be handling the error later
      console.log(error)
    }
  })

module.exports = router
