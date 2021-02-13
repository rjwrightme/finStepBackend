const path = require("path");
const router = require("express").Router();
const userRoutes = require("./user-routes");

// API Routes
router.use(userRoutes);

module.exports = router;
