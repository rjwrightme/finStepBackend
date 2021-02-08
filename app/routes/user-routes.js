const db = require("../models");
const passport = require("../config/passport");

module.exports = (user) => {
  // Login Route
  user.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Signup Route
  user.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Logout Route
  user.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Authentication route for verifying user is logged in.
  user.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's name, email and id
      res.json({
        isAuthenticated: true,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
};
