const express = require("express");
const router = express.Router();

const AuthorizedUser = require("../../models/AuthorizedUser");

const AuthorizedUserArr = [
  new AuthorizedUser("Omar"),
  new AuthorizedUser("7ooda")
];

// update an acoount
router.put("/UpdateAccount/:id", (req, res) => {
  const isEntered = AccountsArr.some(
    Account => Account.Account_id === parseInt(req.params.id)
  );
  if (isEntered) {
    //update name
    const Account = req.name;
    AccountArr.forEach(Account => {
      if (Account.name === req.param.name) {
        Account.name = AccountUpdated.name ? AccountUpdated.name : Account.name;
        Account.details = AccountUpdated.details
          ? AccountUpdated.details
          : Account.details;
        res.json({ msg: "The Account is updated successfully", Account });
      } else {
        res.status(404).json({ msg: "Nothing have changed" });
      }
    });
    //update password
    if (Account.password === req.param.password) {
      Account.password = AccountUpdated.password
        ? AccountUpdated.password
        : Account.password;
      Account.details = AccountUpdated.details
        ? AccountUpdated.details
        : Account.details;
      res.json({ msg: "The Account is updated successfully", Account });
    } else {
      res.status(404).json({ msg: "Nothing have changed" });
    }
    // update age
    if (Account.age === req.param.age) {
      Account.age = AccountUpdated.age ? AccountUpdated.age : Account.age;
      Account.details = AccountUpdated.details
        ? AccountUpdated.details
        : Account.details;
      res.json({ msg: "The Account is updated successfully", Account });
    } else {
      res.status(404).json({ msg: "Nothing have changed" });
    }
    // update major
    if (Account.major === req.param.major) {
      Account.major = AccountUpdated.major
        ? AccountUpdated.major
        : Account.major;
      Account.details = AccountUpdated.details
        ? AccountUpdated.details
        : Account.details;
      res.json({ msg: "The Account is updated successfully", Account });
    } else {
      res.status(404).json({ msg: "Nothing have changed" });
    }
  }
  // to delete my account (to delete an account as an admin will be implemented in the front end)
  router.delete("/DeleteAccount/:id", (req, res) => {
    const isEntered = AccountsArr.some(
      Account => Account.Account_id === parseInt(req.params.id)
    );
    if (isEntered) {
      AccountsArr.forEach(Account => {
        if (Account.Account_id === parseInt(req.params.id)) {
          delete Account.Account_id;
          delete Account.name;
          delete Account.password;
          delete Account.age;
          delete Account.major;
          delete Account.id;
          res.json({ msg: "The Account is deleted successfully", AccountsArr });
        }
      });
    } else {
      res.status(404).json({ msg: "Error on deleting the Account" });
    }
  });
});

// as authorized user i can delete my account
router.delete("/:name", (req, res) => {
  const isEntered = AuthorizedUserArr.some(
    AuthorizedUser => AuthorizedUser.name === req.params.name
  );
  if (isEntered) {
    AuthorizedUserArr.forEach(AuthorizedUser => {
      if (AuthorizedUser.name === req.params.name) {
        delete AuthorizedUser.id;
        delete AuthorizedUser.name;

        res.json({
          msg: "The user  is deleted successfully",
          AuthorizedUserArr
        });
      }
    });
  } else {
    res.status(404).json({ msg: "Error on deleting this user" });
  }
});

module.exports = router;
