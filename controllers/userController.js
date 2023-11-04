const express = require("express");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("./../models/userModels");
const authenticateUser = require("../middleware/authMiddleware");
const cookieParser = require("cookie-parser");

const messages = require("./../messages");
const {
  existingUserMessage,
  hashErrorMessage,
  mailChAccessDeniedMessage,
  invalidCredentialsMessage,
  authenticationSuccessMessage,
  logoutSuccessMessage,
  deleteUserNotFoundMessage,
  deleteSuccessMessage,
  deleteUserErrorMessage,
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

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res
      .status(401)
      .json({ message: invalidCredentialsMessage, status: 401 });
  }

  if (userModel.isMailCh(email)) {
    return res
      .status(403)
      .json({ message: mailChAccessDeniedMessage, status: 403 });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res
        .status(401)
        .json({ message: invalidCredentialsMessage, status: 401 });
    }

    const token = jsonwebtoken.sign(
      { email: user.email },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({ message: authenticationSuccessMessage, token, status: 200 });
  });
});

router.post("/logout", authenticateUser, (req, res) => {
  const newToken = "";

  res.json({ message: logoutSuccessMessage, token: newToken, status: 200 });
});

router.delete("/delete", authenticateUser, (req, res) => {
  const { email } = req.body;
  const user = userModel.getUserByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ message: deleteUserNotFoundMessage, status: 404 });
  }

  const deleted = userModel.deleteUserByEmail(email);
  if (deleted) {
    res.json({ message: deleteSuccessMessage, status: 200 });
  } else {
    return res
      .status(500)
      .json({ message: deleteUserErrorMessage, status: 500 });
  }
});

module.exports = router;
