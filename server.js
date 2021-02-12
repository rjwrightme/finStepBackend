const express = require("express");
const cors = require("cors");
const passport = require("passport");
const db = require("./app/models");
const routes = require("./app/routes");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.options("*", cors());

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./app/config/passport")(passport);

// Routes
app.use(routes);
// require("./app/routes/user-routes.js")(app);
// require("./app/routes/budget-routes.js")(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
