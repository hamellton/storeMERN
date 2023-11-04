const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const usersFilePath = "./db/users.json";

class UserModel {
  constructor() {
    this.users = this.loadUsersFromJson();
  }

  loadUsersFromJson() {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  }

  saveUsersToJson() {
    fs.writeFileSync(usersFilePath, JSON.stringify(this.users, null, 2));
  }

  getUserByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  createUser(email, password) {
    const newUser = {
      id: uuidv4(),
      email,
      password,
    };

    this.users.push(newUser);
    this.saveUsersToJson();

    return newUser;
  }
}

module.exports = UserModel;
