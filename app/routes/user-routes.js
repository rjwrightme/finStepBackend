const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Load input validation
const validateSignupInput = require("../../validation/signup");
const validateLoginInput = require("../../validation/login");

router.use(cors());

/*-----------------------------
######## Login Route ########
------------------------------*/
router.post("/api/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.user
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((response) => {
      if (response) {
        if (bcrypt.compareSync(req.body.password, response.password)) {
          const payload = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          };
          let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "30m",
          });
          res.json({ accessToken: token });
        } else {
          res.status(400).json({ error: "User does not exist" });
        }
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

/*-----------------------------
######## Signup Route ########
------------------------------*/
router.post("/api/signup", (req, res) => {
  // Form validation
  const { errors, isValid } = validateSignupInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.user
    .findOne({
      email: req.body.email,
    })
    .then((response) => {
      if (response) {
        res.status(400).json({ email: "Email already exists" });
        return res.send("Email already exists");
      } else {
        const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        };
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) throw err;
          userData.password = hash;
          db.user
            .create(userData)
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    });
});

// // Logout Route
// user.get("/api/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

// Authentication route for verifying user is logged in.
// user.get("/api/user_data", (req, res) => {
//   if (!req.user) {
//     // The user is not logged in, send back an empty object
//     res.json({});
//   } else {
//     // Otherwise send back the user's name, email and id
//     res.json({
//       isAuthenticated: true,
//       firstName: req.user.firstName,
//       lastName: req.user.lastName,
//       email: req.user.email,
//       id: req.user.id,
//     });
//   }
// });

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get("/api/user_data", authenticateToken, (req, res) => {
  console.log(req.user);
  db.user
    .findOne({
      id: req.user.id,
    })
    .then((response) => {
      if (response) {
        response = { ...response.dataValues, isAuthenticated: true };
        res.json(response);
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = router;
