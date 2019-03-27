const uuid = require("uuid");

//The UnauthorizedUser
class UnauthorizedUser {
  constructor(username, password) {
    this.id = uuid.v4();
    this.username = username;
    this.password = password;
  }
}

module.exports = UnauthorizedUser;
