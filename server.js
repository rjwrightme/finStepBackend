const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./app/config/passport");

const PORT = process.env.PORT || 8080;
const db = require("./app/models");

const app = express();

app.options("*", cors());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "topsecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./app/routes/user-routes.js")(app);
require("./app/routes/budget-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
