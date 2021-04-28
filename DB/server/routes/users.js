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
  //   Users.
});

// users.post("/register", (req, res) => {
//     const { email, name, password } = req.body;
//     // Check if user exists
//     const checkUser = USERS.find((user) => email === user.email);
//     // If user exists, send appropriate response
//     if (checkUser) {
//       return res.status(409).send("user already exists");
//     }
//     // If user does not exist, create it:
//     // Hash password
//     const hashedPassword = hashSync(password, 10);
//     // Adding user to 'DB'
//     USERS.push({
//       email,
//       name,
//       password: hashedPassword,
//       isAdmin: false,
//     });
//     // Adding information to 'DB'
//     INFORMATION.push({
//       email,
//       info: `${name} info`,
//     });
//     res.status(201).send("Register Success");
//   });

//log in -
//log out

module.exports = users;
