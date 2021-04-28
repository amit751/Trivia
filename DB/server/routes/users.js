require("dotenv").config;
const { Router } = require("express");
const users = Router();
const { hashSync, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../../models");
const { Op } = require("sequelize");

//register
users.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const alreadyExist = await Users.findAll({
    where: {
      [Op.or]: [{ email }, { name }],
    },
  });
  if (alreadyExist.length) {
    return res.status(409).send("user already exists");
  }
  const hashedPassword = hashSync(password, 10);
  return Users.create(
    { email, name, password: hashedPassword, is_admin: false },
    { fields: ["email", "name", "password", "is_admin"] }
  ).then((results) => res.status(201).send("Register Success"));
});

//log in
users.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const user = await Users.findOne({
    where: { name },
  });

  if (!user.length) {
    return res.status(403).send("username or password incorrect");
  }

  try {
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("username or password incorrect");
    }

    //continue from here
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
});

//log out

module.exports = users;
