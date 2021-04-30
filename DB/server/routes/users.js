require("dotenv").config();
const { Router } = require("express");
const users = Router();
const { hashSync, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users, RefreshTokens } = require("../../models");
const { Op } = require("sequelize");
const { validator } = require("../middlewares/validator");

//register
users.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const alreadyExist = await Users.findAll({
    where: {
      [Op.or]: [{ email }, { username }],
    },
  });
  if (alreadyExist.length) {
    return res.status(409).send("user already exists");
  }
  const hashedPassword = hashSync(password, 10);
  return Users.create(
    { email, username, password: hashedPassword, is_admin: false },
    { fields: ["email", "username", "password", "is_admin"] }
  ).then((result) => { return res.status(201).send("Register Success") });
});

// //log in
users.post("/login", async (req, res) => {
  const { username, password } = req.body;
  ////////////if there are no usuername or password
  const foundUser = await Users.findOne({
    where: { username },
  });

  if (!foundUser) {
    return res.status(409).send("username is incorrect");
  }

  try {
    const isPasswordCorrect = await compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      return res.status(409).send("password is incorrect");
    }
    const userData = { username };
    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "12m",
    });
    const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "4h",
    });

    RefreshTokens.create(
      {
        refresh_token: refreshToken,
        expires_at: new Date().getTime() / 1000 + 14400,
        username,
      },
      { fields: ["refresh_token", "expires_at", "username"] }
    );
    return res.json({ accessToken, refreshToken, ...userData });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//log out
users.post("/logout", validator, async (req, res) => {
  const refreshToken = req.refreshToken;
  RefreshTokens.destroy({
    where: { refresh_token: refreshToken }
  }).then((result) => {
    console.log(result);
    res.send("deleted successfully");
  })
});


module.exports = users;
