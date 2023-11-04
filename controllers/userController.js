const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("./../models/userModels");
const cookieParser = require("cookie-parser");

const messages = require("./../messages");
const {
  existingUserMessage,
  hashErrorMessage,
  authenticationSuccessMessage
} = messages.userController;

const router = express.Router();
const userModel = new UserModel();

router.use(cookieParser());

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (userModel.getUserByEmail(email)) {
    return res.status(400).json({ message: existingUserMessage, status: 400 });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: hashErrorMessage, status: 500 });
    }

    userModel.createUser(email, hash);

    return res
      .status(201)
      .json({ message: authenticationSuccessMessage, status: 201 });
  });
});


module.exports = router;
